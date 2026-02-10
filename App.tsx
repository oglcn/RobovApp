import React, { useState, useRef, useEffect } from 'react';
import {
  Bot, ChevronRight, Sparkles, ArrowRight, Compass, Scroll, Search, Star,
  Feather, Shield, Skull, Building2, MapPin, HelpCircle, CheckCircle,
  XCircle, Trophy, Crown, Coins, Map as MapIcon, Settings, MessageCircle, X, Send,
  Percent, Zap, Gift, User, Save, Medal, Ghost, BookOpen, LayoutGrid, QrCode, ScanLine, Camera, LogOut,
  Volume2, VolumeX, Type, Info, Target, ArrowLeft, Lightbulb
} from 'lucide-react';
import { GoogleGenAI, Chat, Modality } from "@google/genai";
import QrScanner from './QrScanner';

import {
  Difficulty, Language, GameMode, FontSizeLevel,
  Artifact, GameQuestion, UserAnswer, ChatMessage, LeaderboardEntry
} from './types';

import {
  TARGET_WORDS, QUESTION_COUNTS, TRANSLATIONS,
  bonusQuestionsData, artifactDatabase, genericArtifacts,
  cities, gameLevels
} from './data';


// --- Audio Helpers ---

function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}


// --- Helper Functions ---

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// --- Main Component ---

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedMuseum, setSelectedMuseum] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [language, setLanguage] = useState<Language>('tr');
  const [highScore, setHighScore] = useState(0);
  const [bonusEnabled, setBonusEnabled] = useState(true);
  const [ttsEnabled, setTtsEnabled] = useState(false); // TTS Default State
  const [fontSizeLevel, setFontSizeLevel] = useState<FontSizeLevel>(0);
  const [showTutorial, setShowTutorial] = useState(false);

  // Leaderboard & Result States
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [playerName, setPlayerName] = useState('');
  const [isScoreSaved, setIsScoreSaved] = useState(false);

  // Game States
  const [questionQueue, setQuestionQueue] = useState<GameQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // Store all user answers mapped by question index
  const [userAnswers, setUserAnswers] = useState<Record<number, UserAnswer>>({});

  const [isProcessing, setIsProcessing] = useState(false);
  const [score, setScore] = useState(0);

  // Joker States
  const [jokerFiftyUsed, setJokerFiftyUsed] = useState(false);
  const [jokerDoubleUsed, setJokerDoubleUsed] = useState(false);
  const [isDoubleChanceActive, setIsDoubleChanceActive] = useState(false);
  const [eliminatedOptions, setEliminatedOptions] = useState<number[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState<number[]>([]);

  // Treasure Hunt State
  const [isScanned, setIsScanned] = useState(false);

  // Hint State
  const [showHint, setShowHint] = useState(false);

  // Chat States
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<Chat | null>(null);

  // Audio Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

  const t = TRANSLATIONS[language];
  const activeQuestion = questionQueue[currentQuestionIndex];
  // Derived state from userAnswers
  const currentAnswer = userAnswers[currentQuestionIndex];

  // Helper to resolve font size class
  const getTextClass = (baseClass: string) => {
    if (fontSizeLevel === 0) return baseClass;

    // Simple mapping of text sizes in order
    const sizeMap = ['text-[10px]', 'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl'];

    const index = sizeMap.indexOf(baseClass);
    if (index === -1) return baseClass; // If not found, return original

    // Increase size based on level (1 level = +1 step, 2 levels = +2 steps)
    // Capping at max size
    const newIndex = Math.min(index + fontSizeLevel, sizeMap.length - 1);

    return sizeMap[newIndex];
  };

  // Load High Score & Settings & Leaderboard from Local Storage
  useEffect(() => {
    // Load leaderboard
    const savedLeaderboard = localStorage.getItem('robovapp_leaderboard');
    if (savedLeaderboard) {
      const parsed = JSON.parse(savedLeaderboard);
      setLeaderboard(parsed);
      // Determine high score from top of leaderboard
      if (parsed.length > 0) {
        setHighScore(parsed[0].score);
      }
    } else {
      // Fallback to legacy highscore if no leaderboard exists
      const savedScore = localStorage.getItem('robovapp_highscore');
      if (savedScore) {
        setHighScore(parseInt(savedScore, 10));
      }
    }

    const savedBonus = localStorage.getItem('robovapp_bonus_enabled');
    if (savedBonus !== null) {
      setBonusEnabled(savedBonus === 'true');
    }

    // Load TTS setting
    const savedTts = localStorage.getItem('robovapp_tts_enabled');
    if (savedTts !== null) {
      setTtsEnabled(savedTts === 'true');
    }

    // Load Font Size Setting
    const savedFontSize = localStorage.getItem('robovapp_font_size');
    if (savedFontSize !== null) {
      setFontSizeLevel(parseInt(savedFontSize) as FontSizeLevel);
    }
  }, []);

  const changeFontSize = (level: FontSizeLevel) => {
    setFontSizeLevel(level);
    localStorage.setItem('robovapp_font_size', String(level));
  };

  // Initialize Welcome Message & Chat Session when language changes
  useEffect(() => {
    // Set initial welcome message
    setChatMessages([{ role: 'model', text: t.chatWelcome }]);

    // Initialize Gemini Chat Session
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const systemInstruction = language === 'tr'
      ? "Sen Robo Asistan'sın. RobovApp adlı bir müze hazine avı oyununun yardımcı rehberisin. Hedef kitlen çocuklar ve gençler. Arkeoloji, tarih, antik eserler ve müzeler hakkında soruları cevapla. Cevapların kısa, anlaşılır, eğlenceli ve teşvik edici olsun. Konu dışı sorulara nazikçe cevap veremeyeceğini söyle."
      : "You are Robo Assistant, a helpful guide for a museum scavenger hunt game called RobovApp. Your target audience is children and teenagers. Answer questions about archaeology, history, ancient artifacts, and museums. Keep your answers short, clear, fun, and encouraging. Politely refuse to answer off-topic questions.";

    try {
      chatSessionRef.current = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: systemInstruction,
        }
      });
    } catch (error) {
      console.error("Chat initialization error:", error);
    }

  }, [language]);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isChatOpen]);

  // --- TTS Helper Function ---
  const generateAndPlayTTS = async (textToSpeak: string) => {
    // Stop any existing audio first
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop();
      } catch (e) { /* ignore */ }
    }

    if (!textToSpeak) return;

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: textToSpeak }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

      if (base64Audio) {
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }

        // Ensure context is running
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
        }

        const audioBuffer = await decodeAudioData(
          decodeBase64(base64Audio),
          audioContextRef.current,
          24000,
          1
        );

        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContextRef.current.destination);
        source.start();
        sourceNodeRef.current = source;
      }
    } catch (error) {
      console.error("Gemini TTS Error:", error);
    }
  };

  // TTS Effect using Gemini for Questions

  useEffect(() => {
    // Stop any existing audio first when screen changes or question changes
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop();
      } catch (e) { /* ignore */ }
    }

    // If not in game or TTS disabled, return
    if (currentScreen !== 'game' || !ttsEnabled) {
      return;
    }

    if (activeQuestion) {
      // Construct text including options for the question
      const optionsText = activeQuestion.options.map((opt, i) =>
        `${String.fromCharCode(65 + i)}) ${opt}`
      ).join('. ');

      const fullTextToRead = `${activeQuestion.text}. ${language === 'tr' ? 'Şıklar' : 'Options'}: ${optionsText}`;

      generateAndPlayTTS(fullTextToRead);
    }

    // Cleanup function
    return () => {
      if (sourceNodeRef.current) {
        try {
          sourceNodeRef.current.stop();
        } catch (e) { /* ignore */ }
      }
    };
  }, [currentScreen, currentQuestionIndex, activeQuestion, ttsEnabled, language]);


  const toggleBonus = () => {
    const newState = !bonusEnabled;
    setBonusEnabled(newState);
    localStorage.setItem('robovapp_bonus_enabled', String(newState));
  };

  const toggleTts = () => {
    const newState = !ttsEnabled;
    setTtsEnabled(newState);
    localStorage.setItem('robovapp_tts_enabled', String(newState));
  };

  const filteredCities = cities.filter(city =>
    city.toLocaleLowerCase(language === 'tr' ? 'tr' : 'en').includes(searchTerm.toLocaleLowerCase(language === 'tr' ? 'tr' : 'en'))
  );

  const selectGameMode = (mode: GameMode) => {
    setGameMode(mode);
    setCurrentScreen('level');
  };

  const startQrScan = () => {
    setGameMode('qr');
    setCurrentScreen('qr-scan');
  };

  const handleQrScanResult = (decodedText: string) => {
    // Find artifact by qrCode
    const allArtifacts = [...artifactDatabase, ...genericArtifacts];
    const matched = allArtifacts.find(a => a.qrCode === decodedText.trim());

    if (matched) {
      // For treasure hunt mode: mark as scanned and continue current question
      if (gameMode === 'treasure' && currentScreen === 'qr-scan') {
        setIsScanned(true);
        setCurrentScreen('game');
        return;
      }

      // For welcome screen QR scan: set museum and go to level select
      if (matched.museums && matched.museums.length > 0) {
        setSelectedCity(matched.museums[1] || matched.museums[0]);
        setSelectedMuseum(matched.museums[0]);
      }
      setCurrentScreen('level');
    } else {
      // Unrecognized QR — show alert and stay on scanner
      alert(language === 'tr' ? 'Bu QR kod tanınmadı. Lütfen bir eser QR kodunu tarayın.' : 'This QR code is not recognized. Please scan an artifact QR code.');
    }
  };

  const handleLevelSubmit = () => {
    if (selectedDifficulty) {
      if (gameMode === 'quiz' || gameMode === 'qr') {
        startGame(selectedDifficulty);
      } else {
        setCurrentScreen('museum');
      }
    }
  };

  const handleCitySelect = (city: string) => setSelectedCity(city);
  const handleMuseumSelect = (museum: string) => {
    setSelectedMuseum(museum);
    if (selectedDifficulty) {
      startGame(selectedDifficulty);
    }
  };

  const startGame = (difficultyId: Difficulty) => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setIsProcessing(false);
    setIsScoreSaved(false);
    setPlayerName('');

    // Reset jokers for new game
    setJokerFiftyUsed(false);
    setJokerDoubleUsed(false);
    setIsDoubleChanceActive(false);
    setEliminatedOptions([]);
    setWrongGuesses([]);
    setShowHint(false);
    setIsScanned(false);

    let availableArtifacts: Artifact[] = [];

    // 1. Filter Artifacts based on Mode
    if (gameMode === 'treasure' || gameMode === 'qr') {
      availableArtifacts = artifactDatabase.filter(art =>
        !selectedCity || art.museums?.some(m => selectedMuseum?.includes(m) || selectedCity?.includes(m) || m === selectedCity)
      );
      // Fallback
      if (availableArtifacts.length < 5) {
        if (gameMode !== 'qr') {
          availableArtifacts = [...availableArtifacts, ...artifactDatabase, ...genericArtifacts];
        } else {
          if (availableArtifacts.length === 0) availableArtifacts = [...artifactDatabase];
        }
      }
    } else {
      // Quiz Mode: Use ALL artifacts + generics
      availableArtifacts = [...artifactDatabase, ...genericArtifacts];
    }

    // Ensure uniqueness via Map by ID
    const uniqueArtifactsMap = new Map();
    availableArtifacts.forEach(item => uniqueArtifactsMap.set(item.id, item));
    availableArtifacts = Array.from(uniqueArtifactsMap.values());

    // 2. Shuffle pool
    availableArtifacts = shuffleArray(availableArtifacts);

    // 3. Determine Question Count based on Difficulty
    const questionCount = QUESTION_COUNTS[difficultyId];

    // 4. Create Questions
    const queue: GameQuestion[] = [];
    for (let i = 0; i < questionCount; i++) {
      const artifact = availableArtifacts[i % availableArtifacts.length]; // Modulo for loop

      // Select Question Data based on Mode
      let qData = artifact.questions[difficultyId];
      let isTreasureMode = gameMode === 'treasure';

      if (isTreasureMode && artifact.inspectionQuestion) {
        qData = artifact.inspectionQuestion;
      }

      // Resolve image: Use specific question image if available, else artifact image
      const resolvedImage = qData.image || artifact.image;

      queue.push({
        artifactName: artifact.name[language],
        image: resolvedImage,
        text: qData.text[language],
        options: qData.options[language],
        correct: qData.correct,
        museums: artifact.museums,
        hint: artifact.hint // Add hint for Treasure Mode
      });
    }

    // Reshuffle regular question queue order
    let finalQueue = shuffleArray(queue);

    // 5. Add Bonus Question if Enabled
    if (bonusEnabled) {
      const randomBonus = bonusQuestionsData[Math.floor(Math.random() * bonusQuestionsData.length)];
      finalQueue.push({
        artifactName: t.bonusTitle,
        image: randomBonus.image,
        text: randomBonus.text[language],
        options: randomBonus.options[language],
        correct: randomBonus.correct,
        isBonus: true,
        museums: []
      });
    }

    setQuestionQueue(finalQueue);

    setShowConfetti(true);
    setTimeout(() => {
      setCurrentScreen('game');
      setShowConfetti(false);
    }, 500);
  };

  // --- Joker Logic ---

  const handleFiftyFifty = () => {
    if (jokerFiftyUsed || isProcessing || currentAnswer) return;

    const currentQ = questionQueue[currentQuestionIndex];
    const correctIdx = currentQ.correct;
    const otherIndices = [0, 1, 2, 3].filter(i => i !== correctIdx);

    // Pick 2 random wrong answers
    const shuffledWrong = shuffleArray(otherIndices);
    const toEliminate = shuffledWrong.slice(0, 2);

    setEliminatedOptions(toEliminate);
    setJokerFiftyUsed(true);
  };

  const handleDoubleChance = () => {
    if (jokerDoubleUsed || isProcessing || currentAnswer) return;
    setIsDoubleChanceActive(true);
    setJokerDoubleUsed(true);
  };

  const handleAnswerClick = (index: number) => {
    // If game locked, or already answered, or eliminated, or wrong guess from Double Dip
    if (isProcessing || currentAnswer || eliminatedOptions.includes(index) || wrongGuesses.includes(index)) return;

    const currentQ = questionQueue[currentQuestionIndex];
    const correct = index === currentQ.correct;

    if (!correct && isDoubleChanceActive) {
      // --- Double Chance Logic: First wrong answer ---
      setWrongGuesses(prev => [...prev, index]);
      setIsDoubleChanceActive(false); // Consume the double chance for this turn
      return; // Let user continue
    }

    // --- Standard Logic ---
    let scoreDelta = 0;
    if (correct) {
      scoreDelta = currentQ.isBonus ? 50 : 10;
    } else {
      if (!currentQ.isBonus) {
        if (selectedDifficulty === 'easy') scoreDelta = 0;
        else if (selectedDifficulty === 'medium') scoreDelta = -3;
        else if (selectedDifficulty === 'hard') scoreDelta = -5;
      }
    }

    setScore(prev => Math.max(0, prev + scoreDelta));

    // Record Answer
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: {
        selectedOption: index,
        isCorrect: correct,
        scoreDelta: scoreDelta
      }
    }));

    setIsProcessing(true);

    // VOICE FEEDBACK LOGIC
    if (ttsEnabled) {
      let feedbackText = "";
      if (correct) {
        feedbackText = language === 'tr' ? "Doğru cevap! Tebrikler." : "Correct answer! Congratulations.";
      } else {
        const correctOptionText = currentQ.options[currentQ.correct];
        feedbackText = language === 'tr'
          ? `Yanlış cevap. Doğru cevap: ${correctOptionText}.`
          : `Wrong answer. The correct answer is: ${correctOptionText}.`;
      }
      generateAndPlayTTS(feedbackText);
    }

    if (correct) {
      setShowConfetti(true);
    }
  };

  const handleNextQuestion = () => {
    setShowConfetti(false);
    setIsProcessing(false);

    // Reset round-specific states
    setEliminatedOptions([]);
    setIsDoubleChanceActive(false);
    setWrongGuesses([]);
    setShowHint(false);
    setIsScanned(false);

    if (currentQuestionIndex < questionQueue.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setCurrentScreen('result');
      setShowConfetti(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setShowConfetti(false);
      setIsProcessing(false);
      setEliminatedOptions([]);
      setIsDoubleChanceActive(false);
      setWrongGuesses([]);
      setShowHint(false);
      setIsScanned(false);
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const resetSelection = () => {
    setSelectedCity(null);
    setSelectedMuseum(null);
  }

  const restartGame = () => {
    setCurrentScreen('welcome');
    setGameMode(null); // Reset mode
    setSelectedDifficulty(null);
    setSelectedCity(null);
    setSelectedMuseum(null);
    setSearchTerm('');
    setScore(0);
    // Joker resets handled in startGame
  }

  const getReward = () => {
    const titles = {
      legend: { tr: "Efsanevi Hazine Avcısı", en: "Legendary Treasure Hunter" },
      master: { tr: "Usta Arkeolog", en: "Master Archaeologist" },
      student: { tr: "Meraklı Öğrenci", en: "Curious Student" },
      novice: { tr: "Acemi Kaşif", en: "Novice Explorer" }
    };
    const texts = {
      legend: { tr: "Mükemmel ötesi! Tarih kitaplarında adın yazacak.", en: "Beyond perfect! Your name will be in history books." },
      master: { tr: "Çok etkileyici. Tarihin derinliklerine hakimsin!", en: "Very impressive. You master the depths of history!" },
      student: { tr: "Güzel başlangıç. Biraz daha araştırma ile harikalar yaratabilirsin.", en: "Good start. With a little more research, you can do wonders." },
      novice: { tr: "Henüz yolun başındasın. Pes etme, öğrenmeye devam et!", en: "You are just at the beginning. Don't give up, keep learning!" }
    };

    if (score >= 900) return { icon: <Crown size={64} className="text-yellow-400 drop-shadow-lg" />, title: titles.legend[language], text: texts.legend[language], color: "text-yellow-400" };
    if (score >= 600) return { icon: <Trophy size={64} className="text-slate-300 drop-shadow-lg" />, title: titles.master[language], text: texts.master[language], color: "text-slate-300" };
    if (score >= 300) return { icon: <Compass size={64} className="text-emerald-400 drop-shadow-lg" />, title: titles.student[language], text: texts.student[language], color: "text-emerald-400" };
    return { icon: <Coins size={64} className="text-orange-400 drop-shadow-lg" />, title: titles.novice[language], text: texts.novice[language], color: "text-orange-400" };
  };

  const handleSaveScore = () => {
    if (!playerName.trim()) return;

    const newEntry: LeaderboardEntry = {
      name: playerName.substring(0, 12), // Limit name length
      score: score,
      date: new Date().toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', { month: 'short', day: 'numeric' })
    };

    // Add new entry, sort desc by score, keep top 10
    const updatedList = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    setLeaderboard(updatedList);
    localStorage.setItem('robovapp_leaderboard', JSON.stringify(updatedList));

    // Update global high score if this is the new best
    if (updatedList.length > 0) {
      setHighScore(updatedList[0].score);
    }

    setIsScoreSaved(true);
  };

  const handleChatSend = async () => {
    if (!chatInput.trim() || isChatLoading) return;

    const userMessage = chatInput.trim();
    setChatMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      // Create session if it doesn't exist (fallback)
      if (!chatSessionRef.current) {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        chatSessionRef.current = ai.chats.create({
          model: 'gemini-3-flash-preview',
          config: {
            systemInstruction: language === 'tr'
              ? "Sen Robo Asistan'sın. RobovApp adlı bir müze hazine avı oyununun yardımcı rehberisin. Hedef kitlen çocuklar ve gençler. Arkeoloji, tarih, antik eserler ve müzeler hakkında soruları cevapla. Cevapların kısa, anlaşılır, eğlenceli ve teşvik edici olsun. Konu dışı sorulara nazikçe cevap veremeyeceğini söyle."
              : "You are Robo Assistant, a helpful guide for a museum scavenger hunt game called RobovApp. Your target audience is children and teenagers. Answer questions about archaeology, history, ancient artifacts, and museums. Keep your answers short, clear, fun, and encouraging. Politely refuse to answer off-topic questions.",
          }
        });
      }

      // Use sendMessage from the chat session to maintain history
      const response = await chatSessionRef.current.sendMessage({ message: userMessage });

      const text = response.text || (language === 'tr' ? "Üzgünüm, şu an cevap veremiyorum." : "Sorry, I can't answer right now.");
      setChatMessages(prev => [...prev, { role: 'model', text: text }]);
    } catch (error) {
      console.error("Chat error:", error);
      setChatMessages(prev => [...prev, { role: 'model', text: language === 'tr' ? "Bir hata oluştu, lütfen tekrar dene." : "An error occurred, please try again." }]);

      // Reset session on error in case of invalid state
      chatSessionRef.current = null;
    } finally {
      setIsChatLoading(false);
    }
  };

  // --- Letter Collection Logic ---
  const getCollectionStatus = () => {
    if (!selectedDifficulty) return { target: "", unlockedCount: 0 };

    const targetWord = TARGET_WORDS[selectedDifficulty];
    const targetLength = targetWord.replace(/\s/g, '').length;

    const correctAnswersCount = Object.values(userAnswers).filter((a: UserAnswer) => a.isCorrect && !questionQueue.find(q => q.isBonus)).length; // Exclude bonus from letter count logic if needed, but keeping it simple usually includes regular Qs. Wait, bonus is extra. Let's count all correct non-bonus answers or simply all correct answers? Prompt implies mechanic for the mode. "Usta arkeolog 30 questions". Bonus is just extra. Let's include all.

    // Re-reading prompt: "Usta arkeolog modunda 2 doğru soru bilince 1 harf kazansın."
    let lettersUnlocked = 0;
    const totalCorrect = Object.values(userAnswers).filter((a: UserAnswer) => a.isCorrect).length;

    if (selectedDifficulty === 'hard') {
      lettersUnlocked = Math.floor(totalCorrect / 2);
    } else {
      lettersUnlocked = totalCorrect;
    }

    return {
      target: targetWord,
      unlockedCount: Math.min(lettersUnlocked, targetLength)
    };
  };

  const collectionStatus = getCollectionStatus();
  const isCollectionComplete = collectionStatus.unlockedCount >= collectionStatus.target.replace(/\s/g, '').length && collectionStatus.target.length > 0;

  return (
    <div className="min-h-screen bg-stone-300 font-sans flex justify-center">

      {/* Background for Desktop area outside the app */}
      <div className="fixed inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>

      {/* Main App Container - Flowing naturally with content */}
      <div className="relative w-full sm:max-w-md min-h-screen bg-stone-900 shadow-2xl flex flex-col z-10 font-sans">

        {/* App Background Layers (inside the column) - Fixed to cover full height */}
        <div className="fixed sm:absolute inset-0 bg-gradient-to-b from-stone-900 via-stone-800 to-stone-950 z-0 pointer-events-none"></div>
        {/* Pattern Overlay */}
        <div className="fixed sm:absolute inset-0 z-0 opacity-5 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="ancient-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse"><path d="M60 20 L80 50 L40 50 Z" fill="none" stroke="#d6d3d1" strokeWidth="2" /><path d="M10 80 Q 30 60 50 80 Q 30 100 10 80 Z" fill="none" stroke="#d6d3d1" strokeWidth="2" /><circle cx="30" cy="80" r="5" fill="none" stroke="#d6d3d1" strokeWidth="2" /><path d="M70 90 Q 80 80 90 90 T 110 90" fill="none" stroke="#d6d3d1" strokeWidth="2" /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#ancient-pattern)" />
          </svg>
        </div>
        {/* Noise Filter */}
        <div className="fixed sm:absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

        <div className="relative z-10 w-full flex-1 flex flex-col">

          {/* SCREEN 1: WELCOME & MODE SELECTION */}
          {currentScreen === 'welcome' && (
            <div className="flex-1 flex flex-col items-center justify-between p-8 pt-20 pb-12 animate-fade-in relative">
              {/* Settings Button */}
              <button onClick={() => setCurrentScreen('settings')} className="absolute top-8 right-6 text-stone-400 hover:text-amber-500 transition-colors p-2 bg-stone-800/50 rounded-full border border-stone-700">
                <Settings size={24} />
              </button>

              <div className="flex flex-col items-center text-center space-y-6">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-amber-500 to-orange-700 rounded-full flex items-center justify-center shadow-lg shadow-amber-900/50 animate-bounce-slow border-4 border-stone-800/50 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
                    <Bot size={64} className="text-stone-900 drop-shadow-lg" />
                  </div>
                  <Sparkles className="absolute -top-2 -right-2 text-yellow-200 animate-pulse drop-shadow-lg" size={32} />
                </div>
                <div className="space-y-2 relative">
                  <h1 className="text-4xl font-bold text-stone-100 tracking-tight font-serif drop-shadow-md">Robov<span className="text-amber-500">App</span></h1>
                  <p className={`text-stone-400 font-medium tracking-wide ${getTextClass('text-lg')}`}>{t.welcomeTitle}</p>
                </div>
              </div>

              <div className="w-full space-y-3 mt-8">
                {/* How to Play Button */}
                <button
                  onClick={() => setShowTutorial(true)}
                  className={`w-full flex items-center justify-center gap-2 text-emerald-400 mb-2 bg-emerald-900/20 py-2.5 px-4 rounded-full backdrop-blur-sm border border-emerald-500/30 hover:bg-emerald-900/40 transition-colors ${getTextClass('text-sm')}`}
                >
                  <Info size={16} /> <span>{t.howToPlay}</span>
                </button>

                <div className={`flex items-center justify-center gap-2 text-stone-400 mb-2 bg-stone-900/50 py-2 px-4 rounded-full backdrop-blur-sm border border-stone-800 ${getTextClass('text-sm')}`}>
                  <LayoutGrid size={16} className="text-amber-500" /> <span>{t.ready}</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Treasure Hunt Mode */}
                  <div className="flex flex-col gap-2">
                    <button onClick={() => selectGameMode('treasure')} className="flex flex-col items-center justify-center gap-3 bg-stone-800 hover:bg-stone-700 border-2 border-stone-600 hover:border-amber-500 p-4 rounded-2xl transition-all duration-300 group shadow-lg hover:-translate-y-1 relative overflow-hidden h-full">
                      <div className="w-12 h-12 bg-amber-900/40 rounded-full flex items-center justify-center border border-amber-700 group-hover:bg-amber-600/20 group-hover:border-amber-500 transition-colors">
                        <MapIcon className="text-amber-500 group-hover:text-amber-400" size={24} />
                      </div>
                      <div className="text-center">
                        <h3 className={`font-bold text-stone-200 mb-1 ${getTextClass('text-sm')}`}>{t.modeTreasureTitle}</h3>
                        <p className="text-[10px] text-stone-500 leading-tight">{t.modeTreasureDesc}</p>
                      </div>
                    </button>

                    {/* Integrated QR Button - RESIZED */}
                    <button onClick={startQrScan} className="flex items-center justify-center gap-3 bg-stone-800/80 hover:bg-emerald-600 border border-stone-600 hover:border-emerald-500 p-4 rounded-xl transition-all duration-300 group shadow-md">
                      <QrCode size={20} className="text-stone-400 group-hover:text-white" />
                      <span className={`font-bold text-stone-300 group-hover:text-white ${getTextClass('text-sm')}`}>{t.scanQR}</span>
                    </button>
                  </div>

                  {/* Quiz Mode */}
                  <button onClick={() => selectGameMode('quiz')} className="flex flex-col items-center justify-center gap-3 bg-stone-800 hover:bg-stone-700 border-2 border-stone-600 hover:border-emerald-500 p-4 rounded-2xl transition-all duration-300 group shadow-lg hover:-translate-y-1 h-full">
                    <div className="w-12 h-12 bg-emerald-900/40 rounded-full flex items-center justify-center border border-emerald-700 group-hover:bg-emerald-600/20 group-hover:border-emerald-500 transition-colors">
                      <BookOpen className="text-emerald-500 group-hover:text-emerald-400" size={24} />
                    </div>
                    <div className="text-center">
                      <h3 className={`font-bold text-stone-200 mb-1 ${getTextClass('text-sm')}`}>{t.modeQuizTitle}</h3>
                      <p className="text-[10px] text-stone-500 leading-tight">{t.modeQuizDesc}</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Tutorial Modal */}
              {showTutorial && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
                  <div className="bg-stone-900 border-2 border-amber-500/50 rounded-[2rem] p-6 w-full max-w-sm shadow-2xl relative flex flex-col max-h-[90vh] overflow-y-auto custom-scrollbar">
                    <button onClick={() => setShowTutorial(false)} className="absolute top-4 right-4 text-stone-400 hover:text-white"><X size={24} /></button>

                    <div className="text-center mb-6">
                      <h2 className={`font-bold text-amber-500 font-serif mb-1 ${getTextClass('text-2xl')}`}>{t.tutorialTitle}</h2>
                      <div className="h-1 w-16 bg-amber-500/30 mx-auto rounded-full"></div>
                    </div>

                    <div className="space-y-6">
                      {/* Step 1 */}
                      <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-full bg-blue-900/40 border border-blue-500/50 flex items-center justify-center shrink-0 text-blue-400 font-bold font-serif">1</div>
                        <div>
                          <h3 className={`font-bold text-white mb-1 ${getTextClass('text-base')}`}>{t.step1Title}</h3>
                          <p className={`text-stone-400 ${getTextClass('text-sm')}`}>{t.step1Desc}</p>
                        </div>
                      </div>
                      {/* Step 2 */}
                      <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-full bg-purple-900/40 border border-purple-500/50 flex items-center justify-center shrink-0 text-purple-400 font-bold font-serif">2</div>
                        <div>
                          <h3 className={`font-bold text-white mb-1 ${getTextClass('text-base')}`}>{t.step2Title}</h3>
                          <p className={`text-stone-400 ${getTextClass('text-sm')}`}>{t.step2Desc}</p>
                        </div>
                      </div>
                      {/* Step 3 */}
                      <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-full bg-emerald-900/40 border border-emerald-500/50 flex items-center justify-center shrink-0 text-emerald-400 font-bold font-serif">3</div>
                        <div>
                          <h3 className={`font-bold text-white mb-1 ${getTextClass('text-base')}`}>{t.step3Title}</h3>
                          <p className={`text-stone-400 ${getTextClass('text-sm')}`}>{t.step3Desc}</p>
                        </div>
                      </div>
                      {/* Step 4 */}
                      <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-full bg-amber-900/40 border border-amber-500/50 flex items-center justify-center shrink-0 text-amber-400 font-bold font-serif">4</div>
                        <div>
                          <h3 className={`font-bold text-white mb-1 ${getTextClass('text-base')}`}>{t.step4Title}</h3>
                          <p className={`text-stone-400 ${getTextClass('text-sm')}`}>{t.step4Desc}</p>
                        </div>
                      </div>
                    </div>

                    <button onClick={() => setShowTutorial(false)} className={`mt-8 w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl transition-colors ${getTextClass('text-base')}`}>
                      {t.gotIt}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SCREEN: QR SCANNING (Simulated) */}
          {currentScreen === 'qr-scan' && (
            <QrScanner
              language={language}
              onScanSuccess={handleQrScanResult}
              onClose={() => setCurrentScreen(gameMode === 'treasure' ? 'game' : 'welcome')}
            />
          )}

          {/* SCREEN: SETTINGS */}
          {currentScreen === 'settings' && (
            <div className="flex-1 flex flex-col p-6 pt-12 animate-slide-up">
              <button onClick={() => setCurrentScreen('welcome')} className="absolute top-12 left-6 text-stone-400 hover:text-amber-500 transition-colors flex items-center gap-1 z-20 font-serif">← {t.back}</button>
              <div className="mt-8 mb-4 text-center space-y-2">
                <h2 className="text-3xl font-bold text-stone-100 font-serif tracking-wide drop-shadow-md">{t.settings}</h2>
                <p className="text-stone-400 text-sm font-medium">{t.selectLanguage}</p>
              </div>

              <div className="flex-1 flex flex-col justify-start gap-6 pb-8">
                {/* Language Selection */}
                <div className="flex flex-col gap-3">
                  <button onClick={() => setLanguage('tr')} className={`w-full py-4 rounded-2xl border-2 flex items-center justify-center gap-4 transition-all ${language === 'tr' ? 'bg-amber-600 border-amber-400 text-white shadow-lg' : 'bg-stone-800 border-stone-700 text-stone-400 hover:bg-stone-700'}`}>
                    <div className="text-2xl">🇹🇷</div>
                    <div className="text-xl font-bold font-serif">Türkçe</div>
                  </button>

                  <button onClick={() => setLanguage('en')} className={`w-full py-4 rounded-2xl border-2 flex items-center justify-center gap-4 transition-all ${language === 'en' ? 'bg-amber-600 border-amber-400 text-white shadow-lg' : 'bg-stone-800 border-stone-700 text-stone-400 hover:bg-stone-700'}`}>
                    <div className="text-2xl">🇬🇧</div>
                    <div className="text-xl font-bold font-serif">English</div>
                  </button>
                </div>

                {/* Divider */}
                <div className="h-px bg-stone-700 w-full my-2"></div>

                {/* Game Settings */}
                <div className="flex flex-col gap-4">
                  {/* Font Size Setting */}
                  <div className="bg-stone-900/50 p-4 rounded-2xl border border-stone-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-stone-800 rounded-lg border border-stone-600">
                          <Type size={20} className="text-stone-300" />
                        </div>
                        <div>
                          <h3 className="text-stone-200 font-bold font-serif">{t.fontSizeSetting}</h3>
                          <p className="text-stone-500 text-xs">{t.fontSizeSettingDesc}</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <button onClick={() => changeFontSize(0)} className={`py-2 rounded-xl text-xs font-bold transition-all border ${fontSizeLevel === 0 ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-stone-800 border-stone-600 text-stone-400 hover:bg-stone-700'}`}>{t.fontSizeNormal}</button>
                      <button onClick={() => changeFontSize(1)} className={`py-2 rounded-xl text-sm font-bold transition-all border ${fontSizeLevel === 1 ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-stone-800 border-stone-600 text-stone-400 hover:bg-stone-700'}`}>{t.fontSizeLarge}</button>
                      <button onClick={() => changeFontSize(2)} className={`py-2 rounded-xl text-base font-bold transition-all border ${fontSizeLevel === 2 ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-stone-800 border-stone-600 text-stone-400 hover:bg-stone-700'}`}>{t.fontSizeExtra}</button>
                    </div>
                  </div>

                  {/* Bonus Toggle */}
                  <div className="bg-stone-900/50 p-4 rounded-2xl border border-stone-700">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-stone-800 rounded-lg border border-stone-600">
                          <Gift size={20} className="text-amber-400" />
                        </div>
                        <div>
                          <h3 className="text-stone-200 font-bold font-serif">{t.bonusSetting}</h3>
                          <p className="text-stone-500 text-xs">{t.bonusSettingDesc}</p>
                        </div>
                      </div>
                      <button
                        onClick={toggleBonus}
                        className={`w-14 h-8 rounded-full transition-colors flex items-center px-1 border ${bonusEnabled ? 'bg-emerald-600 border-emerald-500' : 'bg-stone-700 border-stone-600'}`}
                      >
                        <div className={`w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${bonusEnabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </button>
                    </div>
                  </div>

                  {/* TTS Toggle */}
                  <div className="bg-stone-900/50 p-4 rounded-2xl border border-stone-700">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-stone-800 rounded-lg border border-stone-600">
                          {ttsEnabled ? <Volume2 size={20} className="text-sky-400" /> : <VolumeX size={20} className="text-stone-500" />}
                        </div>
                        <div>
                          <h3 className="text-stone-200 font-bold font-serif">{t.ttsSetting}</h3>
                          <p className="text-stone-500 text-xs">{t.ttsSettingDesc}</p>
                        </div>
                      </div>
                      <button
                        onClick={toggleTts}
                        className={`w-14 h-8 rounded-full transition-colors flex items-center px-1 border ${ttsEnabled ? 'bg-emerald-600 border-emerald-500' : 'bg-stone-700 border-stone-600'}`}
                      >
                        <div className={`w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${ttsEnabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center text-stone-600 text-sm font-serif mt-4 pb-4">RobovApp v1.0</div>
            </div>
          )}

          {/* SCREEN 2: LEVEL SELECTION (Merged Age & Difficulty) */}
          {currentScreen === 'level' && (
            <div className="flex-1 flex flex-col p-6 pt-12 animate-slide-up">
              <button onClick={() => setCurrentScreen('welcome')} className="absolute top-12 left-6 text-stone-400 hover:text-amber-500 transition-colors flex items-center gap-1 z-20 font-serif">← {t.back}</button>
              <div className="mt-8 mb-4 text-center space-y-2">
                <h2 className="text-3xl font-bold text-stone-100 font-serif tracking-wide drop-shadow-md">{t.selectLevel}</h2>
                <p className="text-stone-400 text-sm font-medium">{t.selectLevelDesc}</p>
              </div>

              {/* QR Mode Indicator */}
              {gameMode === 'qr' && selectedMuseum && (
                <div className="mb-4 bg-emerald-900/30 border border-emerald-600/50 p-3 rounded-xl flex items-center gap-3 animate-fade-in">
                  <div className="bg-emerald-800 p-2 rounded-lg"><MapPin className="text-emerald-400" size={20} /></div>
                  <div>
                    <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">{t.scanSuccess}</div>
                    <div className={`text-stone-200 font-bold font-serif ${getTextClass('text-sm')}`}>{selectedMuseum}</div>
                  </div>
                </div>
              )}

              <div className="flex-1 flex flex-col gap-4 pb-4">
                {gameLevels.map((level) => (
                  <button key={level.id} onClick={() => setSelectedDifficulty(level.id as Difficulty)} className={`relative w-full p-4 rounded-2xl border transition-all duration-300 group backdrop-blur-sm ${selectedDifficulty === level.id ? `${level.color} border-opacity-100 bg-opacity-40 shadow-lg shadow-black/30` : 'border-stone-700 bg-stone-900/60 hover:bg-stone-800/80 hover:border-stone-500'}`}>
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-stone-900 border border-stone-700 shadow-inner ${selectedDifficulty === level.id ? 'ring-2 ring-amber-500/50' : ''}`}>{level.icon}</div>
                      <div className="flex-1 text-left">
                        <h3 className={`font-bold font-serif ${selectedDifficulty === level.id ? 'text-white' : 'text-stone-300'} ${getTextClass('text-lg')}`}>{level.title[language]}</h3>
                        <span className={`font-bold px-2 py-1 rounded bg-stone-950 text-stone-400 border border-stone-800 shadow-inner ${getTextClass('text-xs')}`}>{level.age}</span>
                        <p className={`text-stone-500 leading-snug group-hover:text-stone-400 transition-colors mt-1 ${getTextClass('text-sm')}`}>{level.desc[language]}</p>
                      </div>
                    </div>
                    {selectedDifficulty === level.id && <div className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center border-4 border-stone-900 shadow-lg animate-fade-in z-10"><ChevronRight size={20} className="text-stone-900 stroke-[3]" /></div>}
                  </button>
                ))}
              </div>
              <div className="pt-4 pb-8 mt-auto z-20">
                <button onClick={handleLevelSubmit} disabled={!selectedDifficulty} className={`w-full py-4 rounded-xl font-bold transition-all duration-150 flex items-center justify-center gap-2 ${getTextClass('text-xl')} ${selectedDifficulty ? 'bg-emerald-600 border-emerald-800 text-white hover:bg-emerald-500 shadow-[0_4px_0_rgb(6,95,70)] hover:shadow-[0_2px_0_rgb(6,95,70)] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px]' : 'bg-stone-800 border-stone-900 text-stone-600 cursor-not-allowed shadow-none translate-y-1 opacity-50'}`}>{t.continue} <ArrowRight size={24} /></button>
              </div>
            </div>
          )}

          {/* SCREEN 3: MUSEUM SELECTION (Only for Treasure Mode) */}
          {currentScreen === 'museum' && (
            <div className="flex-1 flex flex-col p-6 pt-12 animate-slide-up relative">
              <button onClick={() => selectedCity ? resetSelection() : setCurrentScreen('level')} className="absolute top-12 left-6 text-stone-400 hover:text-amber-500 transition-colors flex items-center gap-1 z-20 font-serif">← {t.back}</button>
              {!selectedCity ? (
                <>
                  <div className="mt-8 mb-4 text-center space-y-2">
                    <h2 className="text-3xl font-bold text-stone-100 font-serif tracking-wide drop-shadow-md">{t.selectCity}</h2>
                    <p className="text-stone-400 text-sm font-medium">{t.selectCityDesc}</p>
                  </div>
                  <div className="mb-4 relative">
                    <input type="text" placeholder={t.searchCity} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-stone-800/50 border border-stone-600 rounded-xl py-3 pl-10 pr-4 text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors" />
                    <Search className="absolute left-3 top-3.5 text-stone-500" size={18} />
                  </div>
                  <div className="flex-1 pr-1 grid grid-cols-2 gap-2 pb-4 content-start">
                    {filteredCities.map((city, index) => (
                      <button key={index} onClick={() => handleCitySelect(city)} className="p-4 rounded-xl bg-stone-900/60 border border-stone-700 hover:border-amber-500 hover:bg-stone-800 text-stone-300 hover:text-amber-400 transition-all text-left font-serif font-medium flex items-center justify-between group">
                        {city} <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                    {filteredCities.length === 0 && <div className="col-span-2 text-center text-stone-500 py-8">{t.notFound}</div>}
                  </div>
                </>
              ) : (
                <>
                  <div className="mt-8 mb-4 text-center space-y-2 animate-fade-in">
                    <div className="inline-flex items-center justify-center p-3 bg-amber-900/30 rounded-full mb-2 border border-amber-700/50"><MapPin className="text-amber-500" size={24} /></div>
                    <h2 className="text-3xl font-bold text-stone-100 font-serif tracking-wide drop-shadow-md">{selectedCity}</h2>
                    <p className="text-stone-400 text-sm font-medium">{t.availableMuseums}</p>
                  </div>
                  <div className="flex-1 flex flex-col gap-3 pb-4 animate-slide-up">
                    {[`${selectedCity} ${language === 'tr' ? 'Arkeoloji Müzesi' : 'Archeology Museum'}`, `${selectedCity} ${language === 'tr' ? 'Etnografya Müzesi' : 'Ethnography Museum'}`, "..."].map((museumName, idx) => (
                      <button key={idx} onClick={() => handleMuseumSelect(museumName)} className="w-full p-4 rounded-xl bg-stone-900/80 border border-stone-700 hover:border-amber-500 hover:bg-stone-800 text-left transition-all group flex items-start gap-4">
                        <div className="p-2 bg-stone-950 rounded-lg border border-stone-800 group-hover:border-amber-500/50 transition-colors"><Building2 className="text-stone-400 group-hover:text-amber-500" size={20} /></div>
                        <div><h4 className={`text-stone-200 font-bold font-serif group-hover:text-amber-400 transition-colors ${getTextClass('text-base')}`}>{museumName}</h4><span className="text-stone-500 text-xs">{t.available} • 09:00 - 17:00</span></div>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* SCREEN 5: GAME / QUESTION SCREEN */}
          {currentScreen === 'game' && activeQuestion && (
            <div className="flex-1 flex flex-col p-6 pt-12 animate-slide-up">

              {/* Word Collection Header */}
              <div className="mb-4 bg-stone-900/80 rounded-2xl p-3 border border-stone-800 shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">{t.wordCollection}</div>
                  {isCollectionComplete && <div className="text-[10px] text-emerald-400 font-bold animate-pulse">{t.collectionCompleted}</div>}
                </div>
                <div className="flex flex-wrap justify-center gap-1">
                  {collectionStatus.target.split('').map((char, idx, arr) => {
                    const isSpace = char === ' ';
                    // Logic: Show letter if index < unlockedCount OR if it's a space
                    let currentLetterIndex = 0;
                    for (let i = 0; i < idx; i++) {
                      if (arr[i] !== ' ') currentLetterIndex++;
                    }

                    const isUnlocked = currentLetterIndex < collectionStatus.unlockedCount;

                    if (isSpace) return <div key={idx} className="w-4"></div>;

                    return (
                      <div key={idx} className={`w-8 h-8 flex items-center justify-center rounded-lg border text-sm font-bold font-serif transition-all duration-500 ${isUnlocked ? 'bg-amber-500 text-white border-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.5)] transform scale-105' : 'bg-stone-800 text-stone-600 border-stone-700'}`}>
                        {isUnlocked ? char : '?'}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Exit Button & Top Controls */}
              <div className="w-full flex justify-between items-center mb-2">
                {/* Hint Button */}
                <button
                  onClick={() => setShowHint(true)}
                  disabled={showHint}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all text-xs font-bold font-serif ${showHint ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50 cursor-default' : 'bg-stone-900/50 text-stone-400 hover:text-yellow-400 border-stone-800 hover:border-yellow-500/50'}`}
                >
                  <Lightbulb size={14} /> {t.hint}
                </button>

                <button onClick={restartGame} className="flex items-center gap-2 text-stone-500 hover:text-red-400 bg-stone-900/50 hover:bg-stone-900/80 px-3 py-1.5 rounded-lg border border-stone-800/50 transition-all text-xs font-bold font-serif">
                  <LogOut size={14} /> {t.quit}
                </button>
              </div>

              {/* Hint Display */}
              {showHint && (
                <div className="mb-4 bg-yellow-900/20 border border-yellow-500/30 p-3 rounded-xl flex items-start gap-3 animate-fade-in">
                  <div className="bg-yellow-500/10 p-2 rounded-lg mt-1"><Info className="text-yellow-400" size={16} /></div>
                  <div>
                    <div className="text-[10px] text-yellow-500 font-bold uppercase tracking-wider">{t.hintTitle}</div>
                    <div className={`text-stone-300 ${getTextClass('text-xs')}`}>
                      {t.hintContent} <span className="text-yellow-200 font-bold">{activeQuestion.museums?.[0] || selectedMuseum || "Museum"}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Header: Score & Progress */}
              <div className="flex items-center justify-between mb-4 bg-stone-900/60 p-3 rounded-xl border border-stone-800">
                <div className="flex items-center gap-3">
                  {/* Current Score */}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/50"><Star size={16} className="text-amber-400 fill-amber-400" /></div>
                    <div>
                      <span className="text-stone-200 font-bold text-lg font-serif tracking-wide block leading-none">{score}</span>
                      <span className="text-stone-500 text-[10px] font-bold uppercase tracking-wider">{t.score}</span>
                    </div>
                  </div>
                  {/* Divider and High Score */}
                  <div className="h-8 w-px bg-stone-700 mx-1"></div>
                  <div className="flex flex-col justify-center">
                    <span className="text-stone-500 text-[10px] font-bold uppercase tracking-wider leading-none mb-1">{t.highScore}</span>
                    <div className="flex items-center gap-1 text-stone-400">
                      <Trophy size={12} />
                      <span className="font-bold text-sm leading-none font-serif">{highScore}</span>
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-lg border text-xs font-bold transition-colors ${activeQuestion.isBonus ? 'bg-amber-500/20 border-amber-500 text-amber-400 animate-pulse' : 'bg-stone-800 border-stone-700 text-stone-400'}`}>
                  {activeQuestion.isBonus ? t.bonusTag : `${t.question} ${currentQuestionIndex + 1}/${questionQueue.length}`}
                </div>
              </div>

              {/* Target Artifact Hint for QR Mode */}
              {gameMode === 'qr' && !activeQuestion.isBonus && (
                <div className="mb-4 bg-emerald-900/40 border border-emerald-500/50 p-3 rounded-xl flex items-center gap-3 animate-pulse">
                  <div className="bg-emerald-800 p-2 rounded-lg"><MapPin className="text-emerald-300" size={20} /></div>
                  <div>
                    <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">{t.targetArtifact}</div>
                    <div className={`text-stone-200 font-bold ${getTextClass('text-xs')}`}>{t.targetFind}</div>
                  </div>
                </div>
              )}

              {/* Artifact Card */}
              <div className={`relative w-full aspect-video rounded-2xl overflow-hidden border-2 shadow-xl mb-4 group shrink-0 ${activeQuestion.isBonus ? 'border-amber-500 ring-4 ring-amber-500/20' : 'border-stone-700'}`}>
                <img src={activeQuestion.image} alt={activeQuestion.artifactName} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 to-transparent flex flex-col justify-end p-4">
                  <h3 className={`font-bold font-serif drop-shadow-md ${activeQuestion.isBonus ? 'text-amber-400' : 'text-white'} ${getTextClass('text-xl')}`}>{activeQuestion.artifactName}</h3>
                </div>
              </div>

              {/* Question Area */}
              <div className="bg-stone-900/60 p-4 rounded-xl border border-stone-700 mb-4 backdrop-blur-sm shrink-0">
                <div className="flex gap-3">
                  {/* Icon */}
                  {gameMode === 'treasure' && !isScanned ? (
                    <Lightbulb className="text-amber-500 shrink-0 mt-1" size={24} />
                  ) : activeQuestion.isBonus ? (
                    <Gift className="text-amber-500 shrink-0 mt-1" size={24} />
                  ) : (
                    <HelpCircle className="text-amber-500 shrink-0 mt-1" size={24} />
                  )}

                  {/* Text Content */}
                  <p className={`font-medium leading-relaxed ${activeQuestion.isBonus ? 'text-amber-100' : 'text-stone-200'} ${getTextClass('text-base')}`}>
                    {gameMode === 'treasure' && !isScanned && activeQuestion.hint
                      ? activeQuestion.hint[language]
                      : activeQuestion.text}
                  </p>
                </div>
              </div>

              {/* Treasure Hunt: Scan Button */}
              {gameMode === 'treasure' && !isScanned && !activeQuestion.isBonus ? (
                <div className="flex flex-col items-center justify-center flex-1 pb-8">
                  <button
                    onClick={() => {
                      setCurrentScreen('qr-scan');
                    }}
                    className="flex flex-col items-center justify-center gap-4 bg-emerald-600 hover:bg-emerald-500 text-white p-8 rounded-3xl shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all animate-pulse hover:scale-105 border-4 border-emerald-400/50"
                  >
                    <QrCode size={64} />
                    <span className={`font-bold font-serif ${getTextClass('text-2xl')}`}>{t.scanQR}</span>
                  </button>
                  <p className="mt-6 text-stone-500 text-center max-w-xs text-sm">
                    {t.scanInstruction}
                  </p>
                </div>
              ) : (
                /* Normal Options & Jokers */
                <>
                  {/* Jokers Section - Moved Above Options */}
                  {/* Disable Jokers for Bonus Question */}
                  {currentAnswer === undefined && !activeQuestion.isBonus && (
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {/* 50/50 Joker */}
                      <button
                        onClick={handleFiftyFifty}
                        disabled={jokerFiftyUsed}
                        className={`flex flex-row items-center justify-center gap-2 p-3 rounded-xl border transition-all ${jokerFiftyUsed
                          ? 'bg-stone-900/50 border-stone-800 text-stone-600 cursor-not-allowed'
                          : 'bg-stone-800 border-stone-600 text-stone-300 hover:bg-stone-700 hover:border-amber-500 hover:text-amber-400 shadow-md active:translate-y-1'}`}
                      >
                        <Percent size={18} />
                        <span className="text-xs font-bold">{t.fiftyFifty}</span>
                      </button>

                      {/* Double Chance Joker */}
                      <button
                        onClick={handleDoubleChance}
                        disabled={jokerDoubleUsed}
                        className={`flex flex-row items-center justify-center gap-2 p-3 rounded-xl border transition-all relative overflow-hidden ${jokerDoubleUsed
                          ? 'bg-stone-900/50 border-stone-800 text-stone-600 cursor-not-allowed'
                          : 'bg-stone-800 border-stone-600 text-stone-300 hover:bg-stone-700 hover:border-amber-500 hover:text-amber-400 shadow-md active:translate-y-1'}
                         ${isDoubleChanceActive && !currentAnswer ? 'ring-2 ring-emerald-500 ring-offset-2 ring-offset-stone-900 border-emerald-500' : ''}
                         `}
                      >
                        {isDoubleChanceActive && !currentAnswer && <div className="absolute inset-0 bg-emerald-500/10 animate-pulse"></div>}
                        <Zap size={18} />
                        <span className="text-xs font-bold">{t.doubleChance}</span>
                      </button>
                    </div>
                  )}

                  {/* Options */}
                  <div className="flex flex-col gap-3 pb-4">
                    {activeQuestion.options.map((option, idx) => {
                      let buttonStyle = "bg-stone-800 border-stone-700 text-stone-300 hover:bg-stone-700";
                      let icon = null;
                      const isEliminated = eliminatedOptions.includes(idx);
                      const isWrongGuess = wrongGuesses.includes(idx);

                      if (currentAnswer) {
                        // Answer State Check
                        if (idx === activeQuestion.correct) {
                          buttonStyle = "bg-emerald-900/60 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]";
                          icon = <CheckCircle size={20} className="text-emerald-400" />;
                        } else if (idx === currentAnswer.selectedOption) {
                          buttonStyle = "bg-red-900/60 border-red-500 text-white";
                          icon = <XCircle size={20} className="text-red-400" />;
                        } else {
                          buttonStyle = "bg-stone-900/40 border-stone-800 text-stone-600 opacity-50";
                        }
                      } else if (isWrongGuess) {
                        // Specific for Double Dip wrong guess state
                        buttonStyle = "bg-red-900/40 border-red-800 text-stone-400 opacity-75 cursor-not-allowed";
                        icon = <XCircle size={20} className="text-red-500/50" />;
                      } else if (isEliminated) {
                        buttonStyle = "bg-stone-900/20 border-stone-800/50 text-stone-700 opacity-20 cursor-not-allowed";
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleAnswerClick(idx)}
                          disabled={currentAnswer !== undefined || isEliminated || isWrongGuess}
                          className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all duration-300 flex justify-between items-center ${buttonStyle} ${getTextClass('text-base')}`}
                        >
                          <span>{option}</span> {icon}
                        </button>
                      )
                    })}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="mt-auto pb-8 pt-2 flex gap-3">
                    {currentQuestionIndex > 0 && (
                      <button
                        onClick={handlePrevQuestion}
                        className={`flex-1 py-4 rounded-xl bg-stone-800 text-stone-400 font-bold hover:bg-stone-700 transition-colors border border-stone-700 flex items-center justify-center gap-2 ${getTextClass('text-lg')}`}
                      >
                        <ArrowLeft size={20} /> {t.prev}
                      </button>
                    )}

                    {currentAnswer !== undefined && (
                      <button
                        onClick={handleNextQuestion}
                        className={`flex-1 py-4 rounded-xl bg-amber-600 text-white font-bold hover:bg-amber-500 transition-colors shadow-lg border border-amber-500 flex items-center justify-center gap-2 ${getTextClass('text-lg')}`}
                      >
                        {currentQuestionIndex + 1 === questionQueue.length ? t.seeResult : t.next} <ArrowRight size={20} />
                      </button>
                    )}
                  </div>



                </>
              )}

            </div>
          )}

          {/* SCREEN 6: RESULT & LEADERBOARD */}
          {currentScreen === 'result' && (
            <div className="flex-1 flex flex-col p-6 animate-fade-in text-center relative overflow-hidden min-h-screen">
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                {[...Array(10)].map((_, i) => <div key={i} className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random()}s`, animationDuration: '3s' }}></div>)}
              </div>

              {!isScoreSaved ? (
                // --- PART 1: SCORE & INPUT ---
                <div className="flex-1 w-full flex flex-col items-center justify-center animate-slide-up z-10 pb-12">
                  <div className="mb-4 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-amber-500/20 rounded-full blur-2xl animate-pulse"></div>
                    <div className="relative animate-bounce-slow">{getReward().icon}</div>
                  </div>

                  {/* Special Badge for Word Collection */}
                  {isCollectionComplete && (
                    <div className="mb-4 bg-gradient-to-r from-amber-600 to-yellow-600 p-3 rounded-xl shadow-lg animate-bounce border border-yellow-300">
                      <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider">
                        <Medal size={16} className="text-white fill-white" />
                        {t.congratsBadge}
                      </div>
                    </div>
                  )}

                  <h2 className={`font-bold font-serif mb-2 ${getReward().color} ${getTextClass('text-2xl')}`}>{getReward().title}</h2>
                  <p className={`text-stone-300 mb-6 max-w-[280px] leading-relaxed ${getTextClass('text-sm')}`}>{getReward().text}</p>

                  <div className="bg-stone-900/60 p-4 rounded-2xl border border-stone-700 w-full mb-6 backdrop-blur-sm">
                    <div className="text-stone-500 text-xs font-serif mb-1">{t.totalScore}</div>
                    <div className="text-5xl font-bold text-white font-serif tracking-widest drop-shadow-lg">{score}</div>
                  </div>

                  <div className="w-full space-y-3">
                    <div className="text-left text-xs text-stone-400 pl-2 font-bold">{t.enterName}</div>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <User className="absolute left-3 top-3.5 text-stone-500" size={18} />
                        <input
                          type="text"
                          value={playerName}
                          onChange={(e) => setPlayerName(e.target.value)}
                          placeholder={t.name}
                          maxLength={12}
                          className={`w-full bg-stone-800 border border-stone-600 rounded-xl py-3 pl-10 pr-4 text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500 ${getTextClass('text-base')}`}
                        />
                      </div>
                      <button
                        onClick={handleSaveScore}
                        disabled={!playerName.trim()}
                        className="bg-emerald-600 text-white p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-500 transition-colors"
                      >
                        <Save size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // --- PART 2: LEADERBOARD ---
                <div className="flex-1 flex flex-col h-full animate-slide-up z-10 pb-12">
                  <div className="flex items-center justify-between mb-4 mt-2">
                    <h2 className="text-2xl font-bold text-stone-100 font-serif flex items-center gap-2"><Trophy className="text-amber-400" /> {t.leaderboard}</h2>
                    <div className="px-3 py-1 bg-amber-900/30 border border-amber-800 rounded-lg text-amber-400 text-xs font-bold">
                      {score} P
                    </div>
                  </div>

                  <div className="flex-1 bg-stone-900/40 rounded-2xl border border-stone-800 overflow-hidden flex flex-col min-h-[400px]">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-2 p-3 bg-stone-900/80 border-b border-stone-800 text-xs font-bold text-stone-500 uppercase tracking-wider">
                      <div className="col-span-2 text-center">#</div>
                      <div className="col-span-6 text-left">{t.name}</div>
                      <div className="col-span-4 text-right">{t.score}</div>
                    </div>

                    {/* Table Body */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
                      {leaderboard.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-40 text-stone-500 text-sm italic gap-2">
                          <Ghost size={24} />
                          {t.noRecords}
                        </div>
                      ) : (
                        leaderboard.map((entry, idx) => {
                          const isCurrentUser = entry.name === playerName && entry.score === score;
                          let rankColor = "text-stone-400";
                          if (idx === 0) rankColor = "text-yellow-400";
                          if (idx === 1) rankColor = "text-slate-300";
                          if (idx === 2) rankColor = "text-orange-400";

                          return (
                            <div key={idx} className={`grid grid-cols-12 gap-2 p-3 rounded-lg items-center text-sm transition-colors ${isCurrentUser ? 'bg-amber-900/30 border border-amber-700/50' : 'bg-stone-800/40 border border-transparent'}`}>
                              <div className={`col-span-2 text-center font-bold ${rankColor} text-lg font-serif`}>
                                {idx + 1}
                              </div>
                              <div className="col-span-6 text-left text-stone-200 font-medium truncate flex flex-col">
                                <span className={getTextClass('text-sm')}>{entry.name}</span>
                                <span className="text-[10px] text-stone-600 font-light">{entry.date}</span>
                              </div>
                              <div className={`col-span-4 text-right font-mono font-bold text-emerald-400 ${getTextClass('text-sm')}`}>
                                {entry.score}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  <button onClick={restartGame} className={`w-full mt-4 py-4 rounded-xl bg-amber-600 text-white font-bold hover:bg-amber-500 transition-colors shadow-lg border border-amber-500 flex items-center justify-center gap-2 ${getTextClass('text-lg')}`}>
                    <MapIcon size={20} /> {t.newGame}
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

        {/* CHAT ASSISTANT (ROBO ASISTAN) */}
        {/* Chat Toggle Button - Only visible in welcome screen and positioned above start button */}
        {currentScreen === 'welcome' && (
          <>
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="absolute bottom-36 right-6 z-40 w-14 h-14 rounded-full bg-amber-600 border-2 border-amber-400 text-white shadow-[0_4px_10px_rgba(0,0,0,0.5)] flex items-center justify-center hover:bg-amber-500 hover:scale-110 transition-all duration-300"
            >
              {isChatOpen ? <X size={28} /> : <MessageCircle size={28} />}
            </button>

            {/* Chat Window */}
            {isChatOpen && (
              <div className="absolute bottom-24 right-4 left-4 h-[400px] z-50 bg-stone-900/95 backdrop-blur-md border border-stone-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-up ring-1 ring-amber-500/30">
                {/* Chat Header */}
                <div className="bg-stone-800 p-4 border-b border-stone-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center border border-amber-500/50">
                      <Bot size={18} className="text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-stone-100 font-bold font-serif text-sm">{t.chatTitle}</h3>
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        <span className="text-xs text-stone-400">Online</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setIsChatOpen(false)} className="text-stone-400 hover:text-red-400 transition-colors">
                    <X size={20} />
                  </button>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${msg.role === 'user' ? 'bg-amber-600 text-white rounded-br-none' : 'bg-stone-800 text-stone-300 rounded-bl-none border border-stone-700'}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isChatLoading && (
                    <div className="flex justify-start animate-fade-in">
                      <div className="bg-stone-800 text-stone-400 rounded-2xl rounded-bl-none border border-stone-700 p-3 text-xs flex items-center gap-2">
                        <Bot size={14} className="animate-bounce" /> {t.chatLoading}
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Chat Input */}
                <div className="p-3 bg-stone-800 border-t border-stone-700 flex items-center gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
                    placeholder={t.chatPlaceholder}
                    className={`flex-1 bg-stone-900 border border-stone-600 rounded-xl px-4 py-3 text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 ${getTextClass('text-sm')}`}
                  />
                  <button
                    onClick={handleChatSend}
                    disabled={!chatInput.trim() || isChatLoading}
                    className="bg-amber-600 disabled:bg-stone-700 disabled:text-stone-500 text-white p-3 rounded-xl hover:bg-amber-500 transition-colors"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>

  );
}