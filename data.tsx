import React from 'react';
import { Star, Compass, Scroll } from 'lucide-react';
import { Difficulty, Artifact, LeaderboardEntry } from './types';

// --- Constants ---

export const TARGET_WORDS: Record<Difficulty, string> = {
    easy: "MİNİK KAŞİF",
    medium: "MERAKLI GEZGİN",
    hard: "USTA ARKEOLOG"
};

export const QUESTION_COUNTS: Record<Difficulty, number> = {
    easy: 20,
    medium: 20,
    hard: 30
};

// --- Translations ---

export const TRANSLATIONS = {
    tr: {
        welcomeTitle: "Tarihin Gizemini Çöz",
        start: "Keşfe Başla",
        ready: "Oyun modunu seç ve maceraya başla:",
        back: "Geri",
        selectLevel: "Seviyeni Seç",
        selectLevelDesc: "Yaşına ve bilgine uygun olanı seç.",
        continue: "Devam Et",
        selectCity: "Müzeyi Seç",
        selectCityDesc: "Hangi müzede hazine avına çıkacaksın?",
        searchCity: "Ara...",
        notFound: "Sonuç bulunamadı.",
        availableMuseums: "Aktif müzeler:",
        available: "Müsait",
        startAdventure: "Macerayı Başlat",
        score: "Puan",
        highScore: "Rekor",
        question: "Soru",
        next: "Sonraki",
        prev: "Önceki",
        seeResult: "Sonucu Gör",
        perfect: "MÜKEMMEL! İLERLİYOR...",
        bonusCorrect: "BONUS KAZANILDI! (+50 Puan)",
        totalScore: "TOPLAM SKOR",
        newGame: "Yeni Maceraya Başla",
        settings: "Ayarlar",
        selectLanguage: "Dil Seçimi / Select Language",
        museumsIn: "Müzeler:",
        time: "09:41",
        chatTitle: "Robo Asistan",
        chatPlaceholder: "Tarihle ilgili bir şey sor...",
        chatSend: "Gönder",
        chatWelcome: "Merhaba! Ben Robo Asistan. Arkeoloji, müzeler veya tarih hakkında bana her şeyi sorabilirsin!",
        chatLoading: "Robo Asistan düşünüyor...",
        jokers: "Jokerler",
        fiftyFifty: "%50 Yarı Yarıya",
        doubleChance: "Çift Cevap Hakkı",
        wrongArtifact: "Yanlış eser! Aradığımız bu değil, ipucunu tekrar incele.",
        bonusSetting: "Bonus Soru",
        bonusSettingDesc: "Oyun sonunda ekstra 50 puanlık kolay soru sor.",
        bonusTitle: "BONUS SORU!",
        bonusTag: "BONUS",
        enterName: "Adını Gir Kaşif:",
        saveScore: "Skoru Kaydet",
        leaderboard: "Liderlik Tablosu",
        rank: "Sıra",
        name: "İsim",
        date: "Tarih",
        noRecords: "Henüz kayıt yok. İlk kaşif sen ol!",
        yourRank: "Senin Sıran",
        modeTreasureTitle: "Hazine Avı",
        modeTreasureDesc: "Müzedeki eserleri keşfet, QR kodları tara.",
        modeQuizTitle: "Bilgi Yarışması",
        modeQuizDesc: "Genel tarih bilginle tüm sorulara meydan oku.",
        modeGuideTitle: "Yapay Zeka Rehberi",
        modeGuideDesc: "Uygulama rehberi, müze bilgileri ve arkeoloji sohbetleri.",
        guideWelcome: "Merhaba! Ben Robo Asistan. İstersen sana müzeyi gezdirebilir, eserleri tek tek tanıtabilirim. Tura başlayalım mı? 🏛️",
        scanQR: "QR Kod Tara",
        scanning: "Eser Aranıyor...",
        scanSuccess: "Eser Tespit Edildi!",
        scanInstruction: "Kamerayı eserin yanındaki QR koda tut.",
        targetArtifact: "HEDEF ESER",
        targetFind: "Bu eseri bul ve soruyu cevapla!",
        quit: "Çıkış",
        ttsSetting: "Sesli Okuma (AI)",
        ttsSettingDesc: "Soruları ve şıkları Gemini ile sesli oku.",
        fontSizeSetting: "Yazı Boyutu",
        fontSizeSettingDesc: "Uygulama genelindeki metin boyutunu ayarla.",
        fontSizeNormal: "Normal",
        fontSizeLarge: "Büyük",
        fontSizeExtra: "Çok Büyük",
        howToPlay: "Nasıl Oynanır?",
        tutorialTitle: "Oyun Rehberi",
        step1Title: "Modunu Seç",
        step1Desc: "Hazine avı veya bilgi yarışması.",
        step2Title: "Seviyeni Belirle",
        step2Desc: "Yaşına uygun karakteri seç.",
        step3Title: "Cevapla & Keşfet",
        step3Desc: "Soruları bil, eserleri tanı.",
        step4Title: "Lider Ol",
        step4Desc: "Puan topla, en tepeye çık!",
        gotIt: "Anladım, Başlayalım!",
        hint: "İpucu Al",
        hintTitle: "İPUCU",
        hintContent: "Bu eser şurada sergileniyor: ",
        wordCollection: "HARF KOLEKSİYONU",
        collectionCompleted: "KOLEKSİYON TAMAMLANDI!",
        congratsBadge: "Tebrikler! Özel Rozet Kazanıldı.",
        landingSelectMuseum: "Müze Seç",
        landingScanQR: "QR Kod ile Giriş",
        landingSubtitle: "Müze keşif oyununa hoş geldin!",
        landingOrDivider: "veya",
        selectedMuseumLabel: "Seçili Müze",
        leaderboardTitle: "Liderlik Tablosu",
        leaderboardTreasure: "Hazine Avı",
        leaderboardQuiz: "Bilgi Yarışması"
    },
    en: {
        welcomeTitle: "Unlock History's Mystery",
        start: "Start Exploring",
        ready: "Select game mode to start adventure:",
        back: "Back",
        selectLevel: "Select Level",
        selectLevelDesc: "Choose the one suitable for your age and knowledge.",
        continue: "Continue",
        selectCity: "Select Museum",
        selectCityDesc: "Which museum will you explore?",
        searchCity: "Search...",
        notFound: "No results found.",
        availableMuseums: "Active museums:",
        available: "Available",
        startAdventure: "Start Adventure",
        score: "Score",
        highScore: "Best",
        question: "Question",
        next: "Next",
        prev: "Previous",
        seeResult: "See Results",
        perfect: "PERFECT! MOVING ON...",
        bonusCorrect: "BONUS EARNED! (+50 Points)",
        totalScore: "TOTAL SCORE",
        newGame: "Start New Adventure",
        settings: "Settings",
        selectLanguage: "Dil Seçimi / Select Language",
        museumsIn: "Museums:",
        time: "09:41",
        chatTitle: "Robo Assistant",
        chatPlaceholder: "Ask something about history...",
        chatSend: "Send",
        chatWelcome: "Hello! I am Robo Assistant. You can ask me anything about archaeology, museums, or history!",
        chatLoading: "Robo Assistant is thinking...",
        jokers: "Lifelines",
        fiftyFifty: "50/50 Split",
        doubleChance: "Double Dip",
        wrongArtifact: "Wrong artifact! This is not the one, check the hint again.",
        bonusSetting: "Bonus Question",
        bonusSettingDesc: "Ask an extra 50-point easy question at the end.",
        bonusTitle: "BONUS QUESTION!",
        bonusTag: "BONUS",
        enterName: "Enter Your Name Explorer:",
        saveScore: "Save Score",
        leaderboard: "Leaderboard",
        rank: "Rank",
        name: "Name",
        date: "Date",
        noRecords: "No records yet. Be the first explorer!",
        yourRank: "Your Rank",
        modeTreasureTitle: "Treasure Hunt",
        modeTreasureDesc: "Explore the museum exhibits, scan QR codes.",
        modeQuizTitle: "Quiz Mode",
        modeQuizDesc: "Challenge all questions with your history knowledge.",
        modeGuideTitle: "AI Museum Guide",
        modeGuideDesc: "App guide, museum info, and archaeology chat.",
        guideWelcome: "Hello! I am Robo Assistant. I can guide you through the museum/artifacts. Shall we start the tour? 🏛️",
        scanQR: "Scan QR Code",
        scanning: "Searching Exhibit...",
        scanSuccess: "Exhibit Detected!",
        scanInstruction: "Point camera at the QR code next to the exhibit.",
        targetArtifact: "TARGET EXHIBIT",
        targetFind: "Find this exhibit and answer the question!",
        quit: "Quit",
        ttsSetting: "Voice Narration (AI)",
        ttsSettingDesc: "Read questions and options aloud with Gemini.",
        fontSizeSetting: "Font Size",
        fontSizeSettingDesc: "Adjust text size throughout the app.",
        fontSizeNormal: "Normal",
        fontSizeLarge: "Large",
        fontSizeExtra: "Extra Large",
        howToPlay: "How to Play?",
        tutorialTitle: "Game Guide",
        step1Title: "Select Mode",
        step1Desc: "Treasure hunt or quiz mode.",
        step2Title: "Select Level",
        step2Desc: "Choose char suitable for age.",
        step3Title: "Answer & Explore",
        step3Desc: "Solve questions, know exhibits.",
        step4Title: "Be the Leader",
        step4Desc: "Collect points, reach the top!",
        gotIt: "Got it, Let's Start!",
        hint: "Get Hint",
        hintTitle: "HINT",
        hintContent: "This exhibit is displayed in: ",
        wordCollection: "WORD COLLECTION",
        collectionCompleted: "COLLECTION COMPLETED!",
        congratsBadge: "Congratulations! Special Badge Earned.",
        landingSelectMuseum: "Select Museum",
        landingScanQR: "Enter via QR Code",
        landingSubtitle: "Welcome to the museum exploration game!",
        landingOrDivider: "or",
        selectedMuseumLabel: "Selected Museum",
        leaderboardTitle: "Leaderboard",
        leaderboardTreasure: "Treasure Hunt",
        leaderboardQuiz: "Quiz Mode"
    }
};

// --- Data ---

export const bonusQuestionsData = [
    {
        text: { tr: "Zeytinyağı hangi meyvenin suyundan elde edilir?", en: "Which fruit's juice is olive oil obtained from?" },
        options: { tr: ["Zeytin", "Üzüm", "Portakal", "Elma"], en: ["Olive", "Grape", "Orange", "Apple"] },
        correct: 0,
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=600"
    },
    {
        text: { tr: "Zeytinyağı saklanan büyük toprak kaplara ne denir?", en: "What are the large clay containers used to store olive oil called?" },
        options: { tr: ["Küp", "Testi", "Tencere", "Bardak"], en: ["Pithos/Jar", "Jug", "Pot", "Glass"] },
        correct: 0,
        image: "https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?auto=format&fit=crop&q=80&w=600"
    },
    {
        text: { tr: "Zeytin ağacının yaprağı kışın dökülür mü?", en: "Do olive tree leaves fall in winter?" },
        options: { tr: ["Hayır, her zaman yeşildir", "Evet, tamamen dökülür", "Sadece yarısı dökülür", "Soğukta donar"], en: ["No, it's evergreen", "Yes, they all fall", "Only half fall", "They freeze in cold"] },
        correct: 0,
        image: "https://images.unsplash.com/photo-1445264918150-66a2371142a2?auto=format&fit=crop&q=80&w=600"
    },
    {
        text: { tr: "Zeytinyağı en çok hangi bölgemizde üretilir?", en: "In which region of Turkey is olive oil mostly produced?" },
        options: { tr: ["Ege Bölgesi", "Karadeniz Bölgesi", "İç Anadolu", "Doğu Anadolu"], en: ["Aegean Region", "Black Sea Region", "Central Anatolia", "Eastern Anatolia"] },
        correct: 0,
        image: "https://images.unsplash.com/photo-1501004318855-fce75bfce3dc?auto=format&fit=crop&q=80&w=600"
    }
];

// Old question pool backed up to data_backup.tsx
export const artifactDatabase: Artifact[] = [
    // Soru 1: Zeytin Ağacı Kökü (101 Numara)
    {
        id: 1,
        qrCode: "KOSTEM_101",
        name: { tr: "Zeytin Ağacı Kökü", en: "Olive Tree Root" },
        museums: ["Köstem Zeytinyağı Müzesi", "İzmir"],
        image: "/photos/101.jpeg",
        hint: { tr: "Müzenin girişindeki büyük zeytin ağacı kökünü bul!", en: "Find the big olive tree root at the museum entrance!" },
        inspectionQuestion: {
            text: { tr: "Bu zeytin ağacı kökü yaklaşık kaç yaşındadır?", en: "Approximately how old is this olive tree root?" },
            options: { tr: ["1000", "500", "2000", "300"], en: ["1000", "500", "2000", "300"] },
            correct: 0
        },
        questions: {
            easy: {
                text: { tr: "Zeytin ağaçları çok uzun yıllar yaşayabilir mi?", en: "Can olive trees live for very long years?" },
                options: { tr: ["Evet, binlerce yıl yaşayabilir", "Hayır, en fazla 10 yıl yaşar", "Sadece sıcak ülkelerde yaşar", "Her yıl yeniden dikilir"], en: ["Yes, they can live thousands of years", "No, they live 10 years max", "They only live in hot countries", "They are replanted every year"] },
                correct: 0
            },
            medium: {
                text: { tr: "Dünyanın en yaşlı zeytin ağaçları hangi bölgelerde bulunur?", en: "In which regions are the world's oldest olive trees found?" },
                options: { tr: ["Akdeniz bölgesi", "Kuzey Avrupa", "Güney Amerika", "Uzak Doğu"], en: ["Mediterranean region", "Northern Europe", "South America", "Far East"] },
                correct: 0
            },
            hard: {
                text: { tr: "Bir zeytin ağacının yaşı nasıl belirlenir?", en: "How is the age of an olive tree determined?" },
                options: { tr: ["Gövde çapı ve halka sayısıyla", "Yaprak sayısıyla", "Meyve büyüklüğüyle", "Dal uzunluğuyla"], en: ["By trunk diameter and ring count", "By leaf count", "By fruit size", "By branch length"] },
                correct: 0
            }
        }
    },
    // Soru 2: 4 Taşlı Zeytin Sıkacağı (108 Numara)
    {
        id: 2,
        qrCode: "KOSTEM_108",
        name: { tr: "4 Taşlı Zeytin Sıkacağı", en: "4-Stone Olive Press" },
        museums: ["Köstem Zeytinyağı Müzesi", "İzmir"],
        image: "/photos/108.jpeg",
        hint: { tr: "4 taşlı zeytin sıkacağını bul!", en: "Find the 4-stone olive press!" },
        inspectionQuestion: {
            text: { tr: "4 Taşlı zeytinyağı işliği ne gücü ile çalışır?", en: "What power does the 4-stone olive oil press operate with?" },
            options: { tr: ["Hayvan gücü", "Buhar gücü", "Elektrik gücü", "Rüzgar gücü"], en: ["Animal power", "Steam power", "Electric power", "Wind power"] },
            correct: 0
        },
        questions: {
            easy: {
                text: { tr: "Eskiden zeytinler nasıl ezilirdi?", en: "How were olives crushed in the old days?" },
                options: { tr: ["Taş değirmenlerle", "Elle tek tek", "Ateşte kaynatarak", "Suya atarak"], en: ["With stone mills", "One by one by hand", "By boiling in fire", "By throwing in water"] },
                correct: 0
            },
            medium: {
                text: { tr: "Hayvan gücüyle çalışan değirmenlerde genellikle hangi hayvanlar kullanılırdı?", en: "Which animals were typically used in animal-powered mills?" },
                options: { tr: ["Eşek veya at", "Koyun", "Tavuk", "Kedi"], en: ["Donkey or horse", "Sheep", "Chicken", "Cat"] },
                correct: 0
            },
            hard: {
                text: { tr: "Taş değirmenlerde zeytinlerin ezilme işlemine ne ad verilir?", en: "What is the process of crushing olives in stone mills called?" },
                options: { tr: ["Öğütme/Ezme", "Damıtma", "Fermantasyon", "Kristalizasyon"], en: ["Grinding/Crushing", "Distillation", "Fermentation", "Crystallization"] },
                correct: 0
            }
        }
    },
    // Soru 3: Kazdağlılar Zeytinyağı Fabrikası (201 Numara)
    {
        id: 3,
        qrCode: "KOSTEM_201",
        name: { tr: "Kazdağlılar Zeytinyağı Fabrikası", en: "Kazdağlılar Olive Oil Factory" },
        museums: ["Köstem Zeytinyağı Müzesi", "İzmir"],
        image: "/photos/201.jpeg",
        hint: { tr: "Kazdağlılar Zeytinyağı Fabrikası tabelasını bul!", en: "Find the Kazdağlılar Olive Oil Factory sign!" },
        inspectionQuestion: {
            text: { tr: "Önünüzdeki zeytinyağı fabrikası ne gücü ile çalışır?", en: "What power does this olive oil factory operate with?" },
            options: { tr: ["Buhar gücü", "Hayvan gücü", "Elektrik gücü", "Mazot gücü"], en: ["Steam power", "Animal power", "Electric power", "Diesel power"] },
            correct: 0
        },
        questions: {
            easy: {
                text: { tr: "Buhar gücü ne demektir?", en: "What does steam power mean?" },
                options: { tr: ["Suyun kaynamasıyla oluşan güç", "Rüzgarın gücü", "Güneş enerjisi", "Elektrik enerjisi"], en: ["Power from boiling water", "Wind power", "Solar energy", "Electric energy"] },
                correct: 0
            },
            medium: {
                text: { tr: "Buhar makinesi sanayi devriminde hangi alanlarda kullanılmıştır?", en: "In which areas was the steam engine used during the Industrial Revolution?" },
                options: { tr: ["Fabrikalar ve trenler", "Sadece gemiler", "Sadece tarım", "Sadece madencilik"], en: ["Factories and trains", "Only ships", "Only agriculture", "Only mining"] },
                correct: 0
            },
            hard: {
                text: { tr: "Osmanlı döneminde buhar gücüyle çalışan zeytinyağı fabrikaları ilk hangi bölgede yaygınlaşmıştır?", en: "In which region did steam-powered olive oil factories first become widespread during the Ottoman period?" },
                options: { tr: ["Ege Bölgesi", "Marmara Bölgesi", "Karadeniz Bölgesi", "Akdeniz Bölgesi"], en: ["Aegean Region", "Marmara Region", "Black Sea Region", "Mediterranean Region"] },
                correct: 0
            }
        }
    },
    // Soru 4 + 5: Klazomenai Zeytinyağı Deposu (104 Numara)
    {
        id: 4,
        qrCode: "KOSTEM_104",
        name: { tr: "Klazomenai Zeytinyağı Deposu", en: "Klazomenai Olive Oil Storage" },
        museums: ["Köstem Zeytinyağı Müzesi", "İzmir"],
        image: "/photos/104.jpeg",
        hint: { tr: "Klazomenai Zeytinyağı Deposu'nu bul!", en: "Find the Klazomenai Olive Oil Storage!" },
        inspectionQuestion: {
            text: { tr: "Zeytinyağı saklamak için ne kullanılır?", en: "What is used to store olive oil?" },
            options: { tr: ["Amforalar", "Plastik bidonlar", "Cam şişeler", "Tahta fıçılar"], en: ["Amphoras", "Plastic containers", "Glass bottles", "Wooden barrels"] },
            correct: 0
        },
        questions: {
            easy: {
                text: { tr: "Zeytinyağı saklanan ortamın nasıl olması gerekir?", en: "What should the environment for storing olive oil be like?" },
                options: { tr: ["Karanlık ve serin ortam", "Sıcak ve aydınlık ortam", "Nemli ortam", "Açık hava"], en: ["Dark and cool environment", "Hot and bright environment", "Humid environment", "Open air"] },
                correct: 0
            },
            medium: {
                text: { tr: "Klazomenai antik kenti günümüzde hangi il sınırları içindedir?", en: "Within which city's borders is the ancient city of Klazomenai today?" },
                options: { tr: ["İzmir", "Aydın", "Muğla", "Antalya"], en: ["İzmir", "Aydın", "Muğla", "Antalya"] },
                correct: 0
            },
            hard: {
                text: { tr: "Amforaların üzerindeki mühürler neyi gösterirdi?", en: "What did the seals on amphoras indicate?" },
                options: { tr: ["Üretim yeri ve kalite", "Hava durumu", "Geminin rotası", "Deniz derinliği"], en: ["Place of production and quality", "Weather", "Ship's route", "Sea depth"] },
                correct: 0
            }
        }
    },
    // Soru 6: Gemi (106 Numara)
    {
        id: 5,
        qrCode: "KOSTEM_106",
        name: { tr: "Antik Ticaret Gemisi", en: "Ancient Trade Ship" },
        museums: ["Köstem Zeytinyağı Müzesi", "İzmir"],
        image: "/photos/106.jpeg",
        hint: { tr: "Gemiyi bul!", en: "Find the ship!" },
        inspectionQuestion: {
            text: { tr: "Antik dönemde geminin içinde neler taşınmıştır?", en: "What was transported inside the ship in ancient times?" },
            options: { tr: ["Zeytinyağı, şarap ve buğday", "Altın ve gümüş", "Kumaş ve baharat", "Hayvanlar ve yolcular"], en: ["Olive oil, wine and wheat", "Gold and silver", "Fabric and spices", "Animals and passengers"] },
            correct: 0
        },
        questions: {
            easy: {
                text: { tr: "Eski dönemlerde ticaret en çok hangi yolla yapılırdı?", en: "In ancient times, trade was mostly done by which route?" },
                options: { tr: ["Deniz yoluyla", "Hava yoluyla", "Tren yoluyla", "Uzay yoluyla"], en: ["By sea", "By air", "By train", "By space"] },
                correct: 0
            },
            medium: {
                text: { tr: "Akdeniz'de antik dönem ticaretinin en önemli ürünlerinden biri hangisiydi?", en: "What was one of the most important products of ancient Mediterranean trade?" },
                options: { tr: ["Zeytinyağı", "Çikolata", "Patates", "Domates"], en: ["Olive oil", "Chocolate", "Potato", "Tomato"] },
                correct: 0
            },
            hard: {
                text: { tr: "Antik dönemde Akdeniz ticaretinde zeytinyağı hangi amaçlarla kullanılırdı?", en: "For what purposes was olive oil used in ancient Mediterranean trade?" },
                options: { tr: ["Yemek, aydınlatma ve kozmetik", "Sadece yemek", "Sadece yakıt", "Sadece ilaç"], en: ["Food, lighting and cosmetics", "Only food", "Only fuel", "Only medicine"] },
                correct: 0
            }
        }
    },
    // Soru 7: Zeytinyağı ve Sofralık Zeytin Depolama Alanı (105 Numara)
    {
        id: 6,
        qrCode: "KOSTEM_105",
        name: { tr: "Zeytinyağı ve Sofralık Zeytin Depolama Alanı", en: "Olive Oil and Table Olive Storage Area" },
        museums: ["Köstem Zeytinyağı Müzesi", "İzmir"],
        image: "/photos/105.jpeg",
        hint: { tr: "Zeytinyağı ve sofralık zeytin depolama alanını bul!", en: "Find the olive oil and table olive storage area!" },
        inspectionQuestion: {
            text: { tr: "Zeytinyağı hangi ülkelerde kutsaldı?", en: "In which countries was olive oil considered sacred?" },
            options: { tr: ["Antik Yunanistan ve Mısır", "Roma ve Çin", "Hindistan ve Japonya", "İran ve Babil"], en: ["Ancient Greece and Egypt", "Rome and China", "India and Japan", "Iran and Babylon"] },
            correct: 0
        },
        questions: {
            easy: {
                text: { tr: "Sofralık zeytin ne demektir?", en: "What does table olive mean?" },
                options: { tr: ["Yemek olarak yenen zeytin", "Boyamak için kullanılan zeytin", "İlaç yapılan zeytin", "Süs olarak kullanılan zeytin"], en: ["Olive eaten as food", "Olive used for painting", "Olive used for medicine", "Olive used for decoration"] },
                correct: 0
            },
            medium: {
                text: { tr: "Antik Yunanistan'da zeytin dalı neyin sembolüydü?", en: "What did the olive branch symbolize in Ancient Greece?" },
                options: { tr: ["Barış ve zafer", "Savaş ve güç", "Zenginlik ve şöhret", "Korku ve cesaret"], en: ["Peace and victory", "War and power", "Wealth and fame", "Fear and courage"] },
                correct: 0
            },
            hard: {
                text: { tr: "Antik Mısır'da zeytinyağı özellikle hangi alanda kullanılırdı?", en: "In which area was olive oil especially used in Ancient Egypt?" },
                options: { tr: ["Mumyalama ve dini törenler", "Sadece yemek", "İnşaat", "Tekstil boyama"], en: ["Mummification and religious ceremonies", "Only food", "Construction", "Textile dyeing"] },
                correct: 0
            }
        }
    },
    // Soru 8: Elektrik Gücü ile Çalışan Yerli Zeytinyağı İşliği (206 Numara)
    {
        id: 7,
        qrCode: "KOSTEM_206",
        name: { tr: "Elektrik Gücü ile Çalışan Yerli Zeytinyağı İşliği", en: "Domestic Electric Olive Oil Press" },
        museums: ["Köstem Zeytinyağı Müzesi", "İzmir"],
        image: "/photos/206.jpeg",
        hint: { tr: "Elektrikle çalışan yerli zeytinyağı işliğini bul!", en: "Find the domestic electric olive oil press!" },
        inspectionQuestion: {
            text: { tr: "İlk yerli zeytinyağı fabrikası nerede kurulmuştur?", en: "Where was the first domestic olive oil factory established?" },
            options: { tr: ["Manisa/Akhisar", "İzmir/Bornova", "Aydın/Söke", "Balıkesir/Edremit"], en: ["Manisa/Akhisar", "İzmir/Bornova", "Aydın/Söke", "Balıkesir/Edremit"] },
            correct: 0
        },
        questions: {
            easy: {
                text: { tr: "Elektrik gücü ile çalışan makineler hayatımızı nasıl değiştirdi?", en: "How did electric machines change our lives?" },
                options: { tr: ["İşleri daha hızlı ve kolay hale getirdi", "Hiçbir değişiklik olmadı", "Sadece eğlence için kullanıldı", "Sadece aydınlatma için kullanıldı"], en: ["Made things faster and easier", "No change at all", "Used only for entertainment", "Used only for lighting"] },
                correct: 0
            },
            medium: {
                text: { tr: "Türkiye'de zeytinyağı üretimi en çok hangi bölgede yapılır?", en: "In which region is olive oil production highest in Turkey?" },
                options: { tr: ["Ege Bölgesi", "Karadeniz Bölgesi", "İç Anadolu", "Doğu Anadolu"], en: ["Aegean Region", "Black Sea Region", "Central Anatolia", "Eastern Anatolia"] },
                correct: 0
            },
            hard: {
                text: { tr: "Türkiye'de elektrikle çalışan ilk zeytinyağı fabrikaları hangi yüzyılda yaygınlaşmıştır?", en: "In which century did electric olive oil factories become widespread in Turkey?" },
                options: { tr: ["20. yüzyıl", "18. yüzyıl", "15. yüzyıl", "21. yüzyıl"], en: ["20th century", "18th century", "15th century", "21st century"] },
                correct: 0
            }
        }
    },
    // Soru 9: Zeytin ve Zeytinyağı Kantarları (205 Numara)
    {
        id: 8,
        qrCode: "KOSTEM_205",
        name: { tr: "Zeytin ve Zeytinyağı Kantarları", en: "Olive and Olive Oil Scales" },
        museums: ["Köstem Zeytinyağı Müzesi", "İzmir"],
        image: "/photos/205.jpeg",
        hint: { tr: "Zeytin ve zeytinyağı kantarlarını bul!", en: "Find the olive and olive oil scales!" },
        inspectionQuestion: {
            text: { tr: "İlk terazi sistemleri nerede kuruldu?", en: "Where were the first scale systems established?" },
            options: { tr: ["Babil/Mısır", "Roma/İtalya", "Atina/Yunanistan", "Çin/Asya"], en: ["Babylon/Egypt", "Rome/Italy", "Athens/Greece", "China/Asia"] },
            correct: 0
        },
        questions: {
            easy: {
                text: { tr: "Kantar ne işe yarar?", en: "What is a scale used for?" },
                options: { tr: ["Bir şeyin ağırlığını ölçmek", "Uzunluk ölçmek", "Sıcaklık ölçmek", "Zaman ölçmek"], en: ["To measure weight", "To measure length", "To measure temperature", "To measure time"] },
                correct: 0
            },
            medium: {
                text: { tr: "Zeytinyağı satışında doğru tartı neden önemlidir?", en: "Why is accurate weighing important in olive oil sales?" },
                options: { tr: ["Adil ticaret ve güven için", "Sadece görüntü için", "Renk belirlemek için", "Koku ölçmek için"], en: ["For fair trade and trust", "Just for appearance", "To determine color", "To measure smell"] },
                correct: 0
            },
            hard: {
                text: { tr: "Antik Babil'de ölçü birimleri hangi sisteme dayanırdı?", en: "What system were measurement units based on in Ancient Babylon?" },
                options: { tr: ["Altmışlık (seksagesimal) sisteme", "Onluk sisteme", "İkilik sisteme", "Yirmili sisteme"], en: ["Sexagesimal system", "Decimal system", "Binary system", "Vigesimal system"] },
                correct: 0
            }
        }
    },
    // Soru 10: Mazot Gücü ile Çalışan Sistem (203 Numara)
    {
        id: 9,
        qrCode: "KOSTEM_203",
        name: { tr: "Mazot Gücü ile Çalışan Sistem", en: "Diesel-Powered System" },
        museums: ["Köstem Zeytinyağı Müzesi", "İzmir"],
        image: "/photos/203.jpeg",
        hint: { tr: "Mazot gücü ile çalışan sistemi bul!", en: "Find the diesel-powered system!" },
        inspectionQuestion: {
            text: { tr: "Mazot gücü ile çalışan sistem ilk hangi şehirde kullanıldı?", en: "In which city was the diesel-powered system first used?" },
            options: { tr: ["İzmir", "İstanbul", "Ankara", "Bursa"], en: ["İzmir", "İstanbul", "Ankara", "Bursa"] },
            correct: 0
        },
        questions: {
            easy: {
                text: { tr: "Mazot hangi tür bir yakıttır?", en: "What type of fuel is diesel?" },
                options: { tr: ["Sıvı yakıt (petrol ürünü)", "Katı yakıt", "Gaz yakıt", "Elektrik enerjisi"], en: ["Liquid fuel (petroleum product)", "Solid fuel", "Gas fuel", "Electric energy"] },
                correct: 0
            },
            medium: {
                text: { tr: "Mazotlu motorlar buhar makinelerine göre ne avantaj sağlar?", en: "What advantage do diesel engines have over steam engines?" },
                options: { tr: ["Daha verimli ve taşınabilir", "Daha gürültülü", "Daha yavaş çalışır", "Daha pahalıdır"], en: ["More efficient and portable", "Noisier", "Slower operation", "More expensive"] },
                correct: 0
            },
            hard: {
                text: { tr: "İzmir zeytinyağı üretiminde neden öncü bir şehir olmuştur?", en: "Why has İzmir been a pioneering city in olive oil production?" },
                options: { tr: ["Ege'nin zeytin zenginliği ve liman konumu", "Soğuk iklimi", "Dağlık yapısı", "İç bölgede olması"], en: ["Aegean olive richness and port location", "Cold climate", "Mountainous terrain", "Being inland"] },
                correct: 0
            }
        }
    },
    // Soru 11: İlk Elektrikle Çalışan Zeytinyağı (204 Numara)
    {
        id: 10,
        qrCode: "KOSTEM_204",
        name: { tr: "İlk Elektrikle Çalışan Zeytinyağı İşliği", en: "First Electric Olive Oil Press" },
        museums: ["Köstem Zeytinyağı Müzesi", "İzmir"],
        image: "/photos/204.jpeg",
        hint: { tr: "İlk elektrikle çalışan zeytinyağı işliğini bul!", en: "Find the first electric olive oil press!" },
        inspectionQuestion: {
            text: { tr: "Polima neyden yapılır?", en: "What is the polima made of?" },
            options: { tr: ["Paslanmaz sac", "Bakır", "Ahşap", "Cam"], en: ["Stainless steel sheet", "Copper", "Wood", "Glass"] },
            correct: 0
        },
        questions: {
            easy: {
                text: { tr: "Paslanmaz sac neden tercih edilir?", en: "Why is stainless steel preferred?" },
                options: { tr: ["Paslanmaz ve sağlam olduğu için", "Ucuz olduğu için", "Hafif olduğu için", "Şeffaf olduğu için"], en: ["Because it's rust-proof and strong", "Because it's cheap", "Because it's light", "Because it's transparent"] },
                correct: 0
            },
            medium: {
                text: { tr: "Gıda üretiminde hangi malzeme hijyen açısından en uygun kabul edilir?", en: "Which material is considered most suitable for hygiene in food production?" },
                options: { tr: ["Paslanmaz çelik", "Bakır", "Tahta", "Plastik"], en: ["Stainless steel", "Copper", "Wood", "Plastic"] },
                correct: 0
            },
            hard: {
                text: { tr: "Modern zeytinyağı üretiminde 'soğuk sıkım' ne anlama gelir?", en: "What does 'cold press' mean in modern olive oil production?" },
                options: { tr: ["27°C altında işleme", "Buzdolabında sıkma", "Kışın üretim", "Soğuk suyla yıkama"], en: ["Processing below 27°C", "Pressing in refrigerator", "Winter production", "Washing with cold water"] },
                correct: 0
            }
        }
    },
    // Soru 12: Dönmez Fabrikası (202 Numara)
    {
        id: 11,
        qrCode: "KOSTEM_202",
        name: { tr: "Dönmez Fabrikası", en: "Dönmez Factory" },
        museums: ["Köstem Zeytinyağı Müzesi", "İzmir"],
        image: "/photos/202.jpeg",
        hint: { tr: "Dönmez Fabrikası'nı bul!", en: "Find the Dönmez Factory!" },
        inspectionQuestion: {
            text: { tr: "Zeytin sıkma işi bitince eski insanlar bu makineleri ne amaçla kullanırdı?", en: "What did people use these machines for after the olive pressing season ended?" },
            options: { tr: ["Un değirmeni", "Su pompası", "Odun kesme", "Taş öğütme"], en: ["Flour mill", "Water pump", "Wood cutting", "Stone grinding"] },
            correct: 0
        },
        questions: {
            easy: {
                text: { tr: "Un değirmeni ne işe yarar?", en: "What is a flour mill used for?" },
                options: { tr: ["Buğdayı öğütüp un yapmak", "Suyu temizlemek", "Ağaç kesmek", "Yağ çıkarmak"], en: ["To grind wheat into flour", "To clean water", "To cut trees", "To extract oil"] },
                correct: 0
            },
            medium: {
                text: { tr: "Eski insanlar makineleri birden fazla amaçla kullanırdı. Bu ne avantaj sağlardı?", en: "People used machines for multiple purposes. What advantage did this provide?" },
                options: { tr: ["Kaynak tasarrufu ve verimlilik", "Daha çok gürültü", "Hiçbir avantajı yoktu", "Makineler daha çabuk bozulurdu"], en: ["Resource saving and efficiency", "More noise", "No advantage", "Machines would break faster"] },
                correct: 0
            },
            hard: {
                text: { tr: "Zeytinyağı üretim sezonu genellikle hangi aylardadır?", en: "In which months is the olive oil production season usually?" },
                options: { tr: ["Kasım-Şubat", "Mart-Haziran", "Temmuz-Eylül", "Her mevsim"], en: ["November-February", "March-June", "July-September", "All seasons"] },
                correct: 0
            }
        }
    },
    // Soru 13: Zeytinyağlı Sabun Üretim Kazanı (207 Numara)
    {
        id: 12,
        qrCode: "KOSTEM_207",
        name: { tr: "Zeytinyağlı Sabun Üretim Kazanı", en: "Olive Oil Soap Production Cauldron" },
        museums: ["Köstem Zeytinyağı Müzesi", "İzmir"],
        image: "/photos/207.jpeg",
        hint: { tr: "Zeytinyağlı sabun üretim kazanını bul!", en: "Find the olive oil soap production cauldron!" },
        inspectionQuestion: {
            text: { tr: "Günümüzde zeytin, yemek ve zeytinyağı haricinde hangi amaçla kullanılır?", en: "Besides eating olives and olive oil, what else is it used for today?" },
            options: { tr: ["Sabun üretimi", "Boya yapımı", "İlaç üretimi", "Yakıt"], en: ["Soap production", "Paint making", "Medicine production", "Fuel"] },
            correct: 0
        },
        questions: {
            easy: {
                text: { tr: "Sabun ne işe yarar?", en: "What is soap used for?" },
                options: { tr: ["Temizlik ve hijyen", "Yemek yapımı", "Boya yapımı", "İnşaat"], en: ["Cleaning and hygiene", "Cooking", "Paint making", "Construction"] },
                correct: 0
            },
            medium: {
                text: { tr: "Zeytinyağlı sabun cilt için neden faydalıdır?", en: "Why is olive oil soap beneficial for the skin?" },
                options: { tr: ["Doğal ve nemlendirici olması", "Çok sert olması", "Kimyasal içermesi", "Ucuz olması"], en: ["Being natural and moisturizing", "Being very harsh", "Containing chemicals", "Being cheap"] },
                correct: 0
            },
            hard: {
                text: { tr: "Dünyanın en eski sabun üretim merkezlerinden biri neresidir?", en: "Where is one of the world's oldest soap production centers?" },
                options: { tr: ["Halep (Suriye)", "Tokyo (Japonya)", "New York (ABD)", "Berlin (Almanya)"], en: ["Aleppo (Syria)", "Tokyo (Japan)", "New York (USA)", "Berlin (Germany)"] },
                correct: 0
            }
        }
    },
    // Soru 14: Osmanlı Dönemi Zeytinyağı İşliği (107 Numara)
    {
        id: 13,
        qrCode: "KOSTEM_107",
        name: { tr: "Osmanlı Dönemi Zeytinyağı İşliği", en: "Ottoman Era Olive Oil Press" },
        museums: ["Köstem Zeytinyağı Müzesi", "İzmir"],
        image: "/photos/107.jpeg",
        hint: { tr: "Osmanlı dönemi zeytinyağı işliğini bul!", en: "Find the Ottoman era olive oil press!" },
        inspectionQuestion: {
            text: { tr: "Zeytinyağı kaç kıtada üretilir?", en: "On how many continents is olive oil produced?" },
            options: { tr: ["3 kıta", "5 kıta", "2 kıta", "1 kıta"], en: ["3 continents", "5 continents", "2 continents", "1 continent"] },
            correct: 0
        },
        questions: {
            easy: {
                text: { tr: "Osmanlı İmparatorluğu döneminde zeytinyağı önemli miydi?", en: "Was olive oil important during the Ottoman Empire?" },
                options: { tr: ["Evet, hem yemek hem ticaret için çok önemliydi", "Hayır, hiç kullanılmazdı", "Sadece süs olarak kullanılırdı", "Sadece ilaç olarak kullanılırdı"], en: ["Yes, it was very important for food and trade", "No, it was never used", "It was only used for decoration", "It was only used as medicine"] },
                correct: 0
            },
            medium: {
                text: { tr: "Zeytinyağı üretilen 3 kıta hangileridir?", en: "Which 3 continents produce olive oil?" },
                options: { tr: ["Avrupa, Afrika ve Asya", "Amerika, Avrupa ve Avustralya", "Afrika, Asya ve Antarktika", "Avrupa, Amerika ve Asya"], en: ["Europe, Africa and Asia", "America, Europe and Australia", "Africa, Asia and Antarctica", "Europe, America and Asia"] },
                correct: 0
            },
            hard: {
                text: { tr: "Osmanlı döneminde zeytinyağı üretiminin vergilendirilmesinde kullanılan birime ne denirdi?", en: "What was the unit used for taxing olive oil production in the Ottoman period?" },
                options: { tr: ["Kıyye", "Kilo", "Litre", "Okka"], en: ["Kıyye", "Kilo", "Liter", "Okka"] },
                correct: 0
            }
        }
    },
    // Soru 15: Ezme Taşları ve Tekneleri (103 Numara)
    {
        id: 14,
        qrCode: "KOSTEM_103",
        name: { tr: "Ezme Taşları ve Tekneleri", en: "Crushing Stones and Troughs" },
        museums: ["Köstem Zeytinyağı Müzesi", "İzmir"],
        image: "/photos/103.jpeg",
        hint: { tr: "Ezme taşları ve teknelerini bul!", en: "Find the crushing stones and troughs!" },
        inspectionQuestion: {
            text: { tr: "Ezme taşları nelere göre değişiklik gösterir?", en: "What do crushing stones vary according to?" },
            options: { tr: ["Yöreler", "Mevsimler", "Zeytin türleri", "Üretim miktarı"], en: ["Regions", "Seasons", "Olive varieties", "Production volume"] },
            correct: 0
        },
        questions: {
            easy: {
                text: { tr: "Ezme taşı ne işe yarar?", en: "What is a crushing stone used for?" },
                options: { tr: ["Zeytinleri ezmek için", "Ev inşa etmek için", "Yol yapmak için", "Heykel yapmak için"], en: ["To crush olives", "To build houses", "To make roads", "To make sculptures"] },
                correct: 0
            },
            medium: {
                text: { tr: "Farklı yörelerde ezme taşlarının farklı olmasının sebebi nedir?", en: "Why are crushing stones different in different regions?" },
                options: { tr: ["Yerel taş türleri ve gelenekler", "Aynı fabrikada üretilmemesi", "Tesadüf", "Renk tercihleri"], en: ["Local stone types and traditions", "Not produced in the same factory", "Coincidence", "Color preferences"] },
                correct: 0
            },
            hard: {
                text: { tr: "Zeytinyağı üretiminde ezme işleminin kaliteye etkisi nedir?", en: "What is the effect of the crushing process on olive oil quality?" },
                options: { tr: ["Doğru ezme daha kaliteli yağ verir", "Hiçbir etkisi yoktur", "Sadece renk değişir", "Sadece koku değişir"], en: ["Proper crushing produces higher quality oil", "No effect at all", "Only color changes", "Only smell changes"] },
                correct: 0
            }
        }
    }
];

export const genericArtifacts: Artifact[] = [];

export const cities = [
    "İzmir"
];

export const gameLevels = [
    { id: 'easy', age: '5+', title: { tr: 'Minik Kaşif', en: 'Little Explorer' }, desc: { tr: 'Görsel ipuçları ve eğlenceli görevler.', en: 'Visual clues and fun tasks.' }, icon: <Star size={24} className="text-yellow-400" />, color: 'border-yellow-600 bg-yellow-900/40' },
    { id: 'medium', age: '9+', title: { tr: 'Meraklı Gezgin', en: 'Curious Traveler' }, desc: { tr: 'Gizemli bulmacalar ve keşif rotaları.', en: 'Mysterious puzzles and discovery routes.' }, icon: <Compass size={24} className="text-emerald-400" />, color: 'border-emerald-600 bg-emerald-900/40' },
    { id: 'hard', age: '13+', title: { tr: 'Usta Araştırmacı', en: 'Master Researcher' }, desc: { tr: 'Zorlu sorular ve derin bilgi.', en: 'Challenging questions and deep knowledge.' }, icon: <Scroll size={24} className="text-amber-400" />, color: 'border-amber-600 bg-amber-900/40' }
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
    // Treasure Hunt entries
    { name: "Elif", score: 950, date: "15 Şub", mode: 'treasure' },
    { name: "Burak", score: 870, date: "14 Şub", mode: 'treasure' },
    { name: "Zeynep", score: 780, date: "13 Şub", mode: 'treasure' },
    { name: "Arda", score: 720, date: "12 Şub", mode: 'treasure' },
    { name: "Deniz", score: 650, date: "11 Şub", mode: 'treasure' },
    { name: "Selin", score: 590, date: "10 Şub", mode: 'treasure' },
    { name: "Mert", score: 480, date: "9 Şub", mode: 'treasure' },
    { name: "Ayşe", score: 410, date: "8 Şub", mode: 'treasure' },
    { name: "Kaan", score: 350, date: "7 Şub", mode: 'treasure' },
    { name: "Nisa", score: 290, date: "6 Şub", mode: 'treasure' },
    // Quiz entries
    { name: "Emre", score: 920, date: "15 Şub", mode: 'quiz' },
    { name: "Ceren", score: 850, date: "14 Şub", mode: 'quiz' },
    { name: "Ali", score: 760, date: "13 Şub", mode: 'quiz' },
    { name: "Defne", score: 700, date: "12 Şub", mode: 'quiz' },
    { name: "Yusuf", score: 630, date: "11 Şub", mode: 'quiz' },
    { name: "Beren", score: 560, date: "10 Şub", mode: 'quiz' },
    { name: "Kerem", score: 490, date: "9 Şub", mode: 'quiz' },
    { name: "Duru", score: 420, date: "8 Şub", mode: 'quiz' },
    { name: "Efe", score: 340, date: "7 Şub", mode: 'quiz' },
    { name: "Lina", score: 270, date: "6 Şub", mode: 'quiz' },
];
