import React from 'react';
import { Star, Compass, Scroll } from 'lucide-react';
import { Difficulty, Artifact } from './types';

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
        selectCity: "Şehri Seç",
        selectCityDesc: "Hangi ilde hazine avına çıkacaksın?",
        searchCity: "İl Ara...",
        notFound: "Aradığınız il bulunamadı.",
        availableMuseums: "Bu şehirdeki aktif müzeler:",
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
        modeTreasureDesc: "Şehir şehir gez, müzelerdeki eserleri keşfet.",
        modeQuizTitle: "Bilgi Yarışması",
        modeQuizDesc: "Genel tarih bilginle tüm sorulara meydan oku.",
        scanQR: "QR Kod Tara",
        scanning: "Müze Aranıyor...",
        scanSuccess: "Müze Tespit Edildi!",
        scanInstruction: "Kamerayı müze girişindeki QR koda tut.",
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
        wordCollection: "KELİME KOLEKSİYONU",
        collectionCompleted: "KOLEKSİYON TAMAMLANDI!",
        congratsBadge: "Tebrikler! Özel Rozet Kazanıldı."
    },
    en: {
        welcomeTitle: "Unlock History's Mystery",
        start: "Start Exploring",
        ready: "Select game mode to start adventure:",
        back: "Back",
        selectLevel: "Select Level",
        selectLevelDesc: "Choose the one suitable for your age and knowledge.",
        continue: "Continue",
        selectCity: "Select City",
        selectCityDesc: "In which city will you hunt for treasures?",
        searchCity: "Search City...",
        notFound: "City not found.",
        availableMuseums: "Active museums in this city:",
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
        modeTreasureDesc: "Travel cities, discover artifacts in museums.",
        modeQuizTitle: "Quiz Mode",
        modeQuizDesc: "Challenge all questions with your history knowledge.",
        scanQR: "Scan QR Code",
        scanning: "Searching Museum...",
        scanSuccess: "Museum Detected!",
        scanInstruction: "Point camera at the QR code in the museum entrance.",
        targetArtifact: "TARGET ARTIFACT",
        targetFind: "Find this artifact and answer the question!",
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
        step3Desc: "Solve questions, know artifacts.",
        step4Title: "Be the Leader",
        step4Desc: "Collect points, reach the top!",
        gotIt: "Got it, Let's Start!",
        hint: "Get Hint",
        hintTitle: "HINT",
        hintContent: "This artifact is displayed in: ",
        wordCollection: "WORD COLLECTION",
        collectionCompleted: "COLLECTION COMPLETED!",
        congratsBadge: "Congratulations! Special Badge Earned."
    }
};

// --- Data ---

export const bonusQuestionsData = [
    {
        text: { tr: "Müzelerde eserlere dokunmak neden yasaktır?", en: "Why is it forbidden to touch artifacts in museums?" },
        options: { tr: ["Eserler kirlenebilir ve zarar görebilir", "Alarm sistemi bozulur", "Müze çalışanları kızar", "Dokunmak ücretlidir"], en: ["Artifacts can get dirty and damaged", "Alarm system breaks", "Museum staff gets angry", "Touching costs money"] },
        correct: 0,
        image: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&q=80&w=600"
    },
    {
        text: { tr: "Müzeye girmek için genellikle neye ihtiyacımız vardır?", en: "What do we usually need to enter a museum?" },
        options: { tr: ["Pasaport", "Ehliyet", "Müze Bileti veya Kartı", "Alışveriş Listesi"], en: ["Passport", "Driver's License", "Museum Ticket or Pass", "Shopping List"] },
        correct: 2,
        image: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?auto=format&fit=crop&q=80&w=600"
    },
    {
        text: { tr: "Arkeologlar yerin altındaki eserleri bulmak için ne yaparlar?", en: "What do archaeologists do to find artifacts underground?" },
        options: { tr: ["Balık tutarlar", "Kazı yaparlar", "Resim yaparlar", "Uyurlar"], en: ["Fishing", "Excavation", "Painting", "Sleeping"] },
        correct: 1,
        image: "https://images.unsplash.com/photo-1516937941344-00b4ec274c2b?auto=format&fit=crop&q=80&w=600"
    },
    {
        text: { tr: "Eski zamanlardan günümüze kalan tarihi yapı ve eşyalara ne denir?", en: "What are historical structures and items surviving from ancient times called?" },
        options: { tr: ["Tarihi Eser", "Oyuncak", "Teknoloji", "Moda"], en: ["Historical Artifact", "Toy", "Technology", "Fashion"] },
        correct: 0,
        image: "https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?auto=format&fit=crop&q=80&w=600"
    }
];

export const artifactDatabase: Artifact[] = [
    {
        id: 1,
        qrCode: "ROBOV_ART_1",
        name: { tr: "İskender Lahdi", en: "Alexander Sarcophagus" },
        museums: ["İstanbul Arkeoloji Müzesi", "İstanbul"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Alexander_Sarcophagus_-_side_1.jpg/640px-Alexander_Sarcophagus_-_side_1.jpg",
        hint: { tr: "Kralların savaştığı, mermerden evim. Üzerimde aslan avlayanlar var.", en: "My home is of marble where rulers fought. There are lion hunters upon me." },
        inspectionQuestion: {
            text: { tr: "Lahitin uzun yüzündeki savaş sahnesinde, atlı figürün (İskender) başında ne var?", en: "What is on the head of the horseman figure (Alexander) in the battle scene?" },
            options: { tr: ["Aslan Postu", "Miğfer", "Taç", "Hiçbir şey"], en: ["Lion Skin", "Helmet", "Crown", "Nothing"] },
            correct: 0
        },
        questions: {
            easy: {
                text: { tr: "Bu lahitin üzerindeki kabartmalarda hangi ünlü komutanın savaş sahneleri anlatılıyor?", en: "Which famous commander's battle scenes are depicted on this sarcophagus?" },
                options: { tr: ["Büyük İskender", "Jül Sezar", "Fatih Sultan Mehmet", "Napolyon"], en: ["Alexander the Great", "Julius Caesar", "Mehmed the Conqueror", "Napoleon"] },
                correct: 0
            },
            medium: {
                text: { tr: "İskender Lahdi aslında kime ait olduğu düşünülen bir kral mezarıdır?", en: "Who is this sarcophagus actually believed to belong to?" },
                options: { tr: ["Büyük İskender", "Abdalonymos", "Kral Midas", "Kral Leonidas"], en: ["Alexander the Great", "Abdalonymus", "King Midas", "King Leonidas"] },
                correct: 1
            },
            hard: {
                text: { tr: "İskender Lahdi, 1887 yılında Osman Hamdi Bey tarafından hangi antik kentte bulunmuştur?", en: "In which ancient city was the Alexander Sarcophagus found by Osman Hamdi Bey in 1887?" },
                options: { tr: ["Sayda (Sidon)", "Efes", "Troya", "Pergamon"], en: ["Sidon", "Ephesus", "Troy", "Pergamon"] },
                correct: 0
            }
        }
    },
    {
        id: 2,
        qrCode: "ROBOV_ART_2",
        name: { tr: "Çingene Kızı Mozaiği", en: "The Gypsy Girl Mosaic" },
        museums: ["Gaziantep Zeugma Mozaik Müzesi", "Gaziantep"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Gaziantep_Zeugma_Mosaics_Museum_Gypsy_Girl_1452.jpg/449px-Gaziantep_Zeugma_Mosaics_Museum_Gypsy_Girl_1452.jpg",
        hint: { tr: "Eksik parçalarım olsa da bakışlarım seni takip eder.", en: "Even though I have missing pieces, my eyes follow you." },
        inspectionQuestion: {
            text: { tr: "Çingene Kızı'nın saçlarının arasında hangi bitki figürleri görülmektedir?", en: "Which plant figures are seen among the Gypsy Girl's hair?" },
            options: { tr: ["Üzüm yaprağı ve asma", "Gül dikenleri", "Zeytin dalları", "Defne yaprakları"], en: ["Grape leaves and vines", "Rose thorns", "Olive branches", "Laurel leaves"] },
            correct: 0
        },
        questions: {
            easy: {
                text: { tr: "Bu ünlü mozaik, bakışlarıyla meşhurdur. Hangi ilimizdeki Zeugma Müzesi'nin simgesidir?", en: "Famous for her gaze, which city's Zeugma Museum does this mosaic symbolize?" },
                options: { tr: ["Şanlıurfa", "Gaziantep", "Hatay", "Antalya"], en: ["Şanlıurfa", "Gaziantep", "Hatay", "Antalya"] },
                correct: 1
            },
            medium: {
                text: { tr: "Çingene Kızı mozaiğinin aslında hangi Yunan tanrıçası veya figürü olduğu tahmin edilmektedir?", en: "Which Greek goddess or figure is the Gypsy Girl actually thought to be?" },
                options: { tr: ["Medusa", "Gaia", "Athena", "Hera"], en: ["Medusa", "Gaia", "Athena", "Hera"] },
                correct: 1
            },
            hard: {
                text: { tr: "Çingene Kızı mozaiği, Zeugma antik kentindeki hangi villanın tabanında bulunmuştur?", en: "In which villa's floor was the Gypsy Girl mosaic found in the ancient city of Zeugma?" },
                options: { tr: ["Menad Villası", "Poseidon Villası", "Dionysos Villası", "Maenad Villası"], en: ["Menad Villa", "Poseidon Villa", "Dionysos Villa", "Maenad Villa"] },
                correct: 3
            }
        }
    },
    {
        id: 3,
        qrCode: "ROBOV_ART_3",
        name: { tr: "Celsus Kütüphanesi", en: "Library of Celsus" },
        museums: ["Efes Müzesi", "İzmir"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Ephasus_Celsus_Library.JPG/640px-Ephasus_Celsus_Library.JPG",
        hint: { tr: "Bilginin iki katlı sarayıyım, ama kitaplarım yok artık.", en: "I am the two-story palace of knowledge, but I have no books anymore." },
        inspectionQuestion: {
            text: { tr: "Kütüphanenin ön cephesinde kaç adet kadın heykeli bulunmaktadır?", en: "How many female statues are on the facade of the library?" },
            options: { tr: ["4", "2", "6", "8"], en: ["4", "2", "6", "8"] },
            correct: 0
        },
        questions: {
            easy: {
                text: { tr: "Bu görkemli kütüphane hangi antik kentimizde yer alır?", en: "In which ancient city is this magnificent library located?" },
                options: { tr: ["Efes", "Aspendos", "Hierapolis", "Patara"], en: ["Ephesus", "Aspendos", "Hierapolis", "Patara"] },
                correct: 0
            },
            medium: {
                text: { tr: "Celsus Kütüphanesi'nin ön cephesindeki heykellerden hangisi 'Bilgeliği' temsil eder?", en: "Which statue on the facade of the Celsus Library represents 'Wisdom'?" },
                options: { tr: ["Sophia", "Arete", "Ennoia", "Episteme"], en: ["Sophia", "Arete", "Ennoia", "Episteme"] },
                correct: 0
            },
            hard: {
                text: { tr: "Celsus Kütüphanesi kimin anısına oğlu tarafından yaptırılmıştır?", en: "For whom was the Celsus Library built by his son?" },
                options: { tr: ["Tiberius Julius Celsus", "Hadrianus", "Marcus Aurelius", "Augustus"], en: ["Tiberius Julius Celsus", "Hadrian", "Marcus Aurelius", "Augustus"] },
                correct: 0
            }
        }
    },
    {
        id: 4,
        qrCode: "ROBOV_ART_4",
        name: { tr: "Hitit Güneşi Kursu", en: "Hittite Sun Course" },
        museums: ["Anadolu Medeniyetleri Müzesi", "Ankara"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Ankara_Museum_of_Anatolian_Civilizations_9660.jpg/640px-Ankara_Museum_of_Anatolian_Civilizations_9660.jpg",
        hint: { tr: "Tunçtan yapıldım, geyiğim var, boğam var. Güneşi taşırım.", en: "Made of bronze, I have a deer, I have a bull. I carry the sun." },
        inspectionQuestion: {
            text: { tr: "Kursun alt kısmındaki 'H' şeklindeki parçalar neyi sembolize eder?", en: "What do the 'H' shaped pieces at the bottom of the course symbolize?" },
            options: { tr: ["Boğa Boynuzları", "İnsan Kolları", "Ağaç Dalları", "Nehirler"], en: ["Bull Horns", "Human Arms", "Tree Branches", "Rivers"] },
            correct: 0
        },
        questions: {
            easy: {
                text: { tr: "Bu sembol, Anadolu'nun en eski uygarlıklarından biri olan hangi medeniyete aittir?", en: "This symbol belongs to which of the oldest civilizations of Anatolia?" },
                options: { tr: ["Lidyalılar", "Hititler (Hattiler)", "Urartular", "Sümerler"], en: ["Lydians", "Hittites (Hattians)", "Urartians", "Sumerians"] },
                correct: 1
            },
            medium: {
                text: { tr: "Hitit Güneşi kursları genellikle hangi malzemeden yapılmıştır?", en: "What material were Hittite Sun Courses usually made of?" },
                options: { tr: ["Altın", "Tunç", "Demir", "Gümüş"], en: ["Gold", "Bronze", "Iron", "Silver"] },
                correct: 1
            },
            hard: {
                text: { tr: "Hitit Güneşi kursu ilk olarak hangi kazı alanında bulunmuştur?", en: "In which excavation site was the Hittite Sun Course first found?" },
                options: { tr: ["Alacahöyük", "Hattuşa", "Kültepe", "Gordion"], en: ["Alacahöyük", "Hattusa", "Kültepe", "Gordion"] },
                correct: 0
            }
        }
    },
    {
        id: 5,
        qrCode: "ROBOV_ART_5",
        name: { tr: "Troya Hazineleri", en: "Treasure of Troy" },
        museums: ["Troya Müzesi", "Çanakkale"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Treasure_of_Priam_AO_1.jpg/640px-Treasure_of_Priam_AO_1.jpg",
        hint: { tr: "Surların arkasında saklıydım, savaşla değil hileyle alındım.", en: "I was hidden behind walls, taken not by war but by trickery." },
        inspectionQuestion: {
            text: { tr: "Hazinenin en dikkat çeken parçası olan 'diadem' (başlık) hangi malzemeden yapılmıştır?", en: "What material is the 'diadem' (headdress), the most striking piece of the treasure, made of?" },
            options: { tr: ["Altın", "Gümüş", "Elektron", "Bakır"], en: ["Gold", "Silver", "Electrum", "Copper"] },
            correct: 0
        },
        questions: {
            easy: {
                text: { tr: "Troya Savaşı'nı konu alan ünlü destan hangisidir?", en: "What is the famous epic about the Trojan War?" },
                options: { tr: ["İlyada", "Odysseia", "Aeneas", "Gılgamış"], en: ["Iliad", "Odyssey", "Aeneid", "Gilgamesh"] },
                correct: 0
            },
            medium: {
                text: { tr: "Troya antik kenti hangi ilimiz sınırları içerisindedir?", en: "In which province is the ancient city of Troy located?" },
                options: { tr: ["İzmir", "Balıkesir", "Çanakkale", "Manisa"], en: ["İzmir", "Balıkesir", "Çanakkale", "Manisa"] },
                correct: 2
            },
            hard: {
                text: { tr: "Troya kazılarını başlatan ve hazineleri kaçıran amatör arkeolog kimdir?", en: "Who was the amateur archaeologist who started the Troy excavations and smuggled the treasures?" },
                options: { tr: ["Heinrich Schliemann", "Wilhelm Dörpfeld", "Manfred Korfmann", "Frank Calvert"], en: ["Heinrich Schliemann", "Wilhelm Dörpfeld", "Manfred Korfmann", "Frank Calvert"] },
                correct: 0
            }
        }
    },
    {
        id: 6,
        qrCode: "ROBOV_ART_6",
        name: { tr: "Göbeklitepe", en: "Gobekli Tepe" },
        museums: ["Şanlıurfa Müzesi", "Şanlıurfa"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Gobekli_Tepe%2C_Urfa.jpg/640px-Gobekli_Tepe%2C_Urfa.jpg",
        hint: { tr: "Tarihin sıfır noktasıyım. T şeklinde taşlarım var.", en: "I am the zero point of history. I have T-shaped stones." },
        inspectionQuestion: {
            text: { tr: "T biçimli sütunlar neyi temsil etmektedir (stilize olarak)?", en: "What do the T-shaped pillars represent (stylized)?" },
            options: { tr: ["İnsan", "Ağaç", "Dağ", "Tapınak"], en: ["Human", "Tree", "Mountain", "Temple"] },
            correct: 0
        },
        questions: {
            easy: {
                text: { tr: "Tarihin sıfır noktası olarak bilinen Göbeklitepe hangi ilimizdedir?", en: "In which province is Göbeklitepe, known as the zero point of history?" },
                options: { tr: ["Mardin", "Diyarbakır", "Şanlıurfa", "Adıyaman"], en: ["Mardin", "Diyarbakır", "Şanlıurfa", "Adıyaman"] },
                correct: 2
            },
            medium: {
                text: { tr: "Göbeklitepe'deki dikilitaşlar hangi harf şeklindedir?", en: "What letter shape are the obelisks in Göbeklitepe?" },
                options: { tr: ["T Şeklinde", "L Şeklinde", "U Şeklinde", "I Şeklinde"], en: ["T Shaped", "L Shaped", "U Shaped", "I Shaped"] },
                correct: 0
            },
            hard: {
                text: { tr: "Göbeklitepe'yi keşfeden ve kazıları yöneten Alman arkeolog kimdir?", en: "Who is the German archaeologist who discovered Göbeklitepe and led the excavations?" },
                options: { tr: ["Klaus Schmidt", "Ian Hodder", "James Mellaart", "Ekrem Akurgal"], en: ["Klaus Schmidt", "Ian Hodder", "James Mellaart", "Ekrem Akurgal"] },
                correct: 0
            }
        }
    }
];

export const genericArtifacts: Artifact[] = [
    {
        id: 101,
        qrCode: "ROBOV_BONUS_1",
        name: { tr: "Antik Amfora", en: "Ancient Amphora" },
        image: "https://images.unsplash.com/photo-1544211681-37ff44f2d346?auto=format&fit=crop&q=80&w=600",
        hint: { tr: "Denizlerin dibinden çıktım, zeytinyağı taşıdım.", en: "I came from the bottom of the seas, carried olive oil." },
        inspectionQuestion: {
            text: { tr: "Amforanın alt kısmı neden sivri yapılmıştır?", en: "Why is the bottom of the amphora made pointed?" },
            options: { tr: ["Gemiye veya toprağa saplamak için", "Daha güzel görünmesi için", "Daha çok sıvı alması için", "Taşıması kolay olsun diye"], en: ["To stick into the ship or ground", "To look better", "To hold more liquid", "To be easier to carry"] },
            correct: 0
        },
        questions: {
            easy: {
                text: { tr: "Arkeologlar kazı yaparken eserlere zarar vermemek için genellikle hangi aleti kullanırlar?", en: "What tool do archaeologists usually use to avoid damaging artifacts during excavation?" },
                options: { tr: ["Balta", "Fırça ve Spatula", "Kepçe", "Matkap"], en: ["Axe", "Brush and Spatula", "Excavator", "Drill"] },
                correct: 1
            },
            medium: {
                text: { tr: "Amforalar antik çağda en çok ne taşımak için kullanılırdı?", en: "What were amphoras mostly used to carry in ancient times?" },
                options: { tr: ["Zeytinyağı ve Şarap", "Altın", "Giysi", "Silah"], en: ["Olive Oil and Wine", "Gold", "Clothes", "Weapons"] },
                correct: 0
            },
            hard: {
                text: { tr: "Su altı arkeolojisinde batıklardan en çok çıkarılan eser grubu hangisidir?", en: "Which group of artifacts is most frequently recovered from shipwrecks in underwater archaeology?" },
                options: { tr: ["Amforalar", "Heykeller", "Lahitler", "Mozaikler"], en: ["Amphoras", "Statues", "Sarcophagi", "Mosaics"] },
                correct: 0
            }
        }
    },
    {
        id: 102,
        qrCode: "ROBOV_BONUS_2",
        name: { tr: "Antik Sikke", en: "Ancient Coin" },
        image: "https://images.unsplash.com/photo-1620409093863-745a33c1cb51?auto=format&fit=crop&q=80&w=600",
        hint: { tr: "Ticareti başlattım, elden ele dolaştım.", en: "I started trade, circulated from hand to hand." },
        inspectionQuestion: {
            text: { tr: "Bu sikkenin üzerindeki kabartma ne tür bir figürdür?", en: "What kind of figure is the relief on this coin?" },
            options: { tr: ["İnsan başı (Profil)", "Aslan", "Gemi", "Tapınak"], en: ["Human head (Profile)", "Lion", "Ship", "Temple"] },
            correct: 0
        },
        questions: {
            easy: {
                text: { tr: "Tarihte ilk parayı (sikkeyi) basan Anadolu uygarlığı hangisidir?", en: "Which Anatolian civilization minted the first coin in history?" },
                options: { tr: ["Lidyalılar", "Frigler", "İyonlar", "Urartular"], en: ["Lydians", "Phrygians", "Ionians", "Urartians"] },
                correct: 0
            },
            medium: {
                text: { tr: "Sikkelerin üzerindeki kabartmaları inceleyen bilim dalı nedir?", en: "What is the science that studies the reliefs on coins?" },
                options: { tr: ["Nümismatik", "Epigrafi", "Paleografi", "Antropoloji"], en: ["Numismatics", "Epigraphy", "Paleography", "Anthropology"] },
                correct: 0
            },
            hard: {
                text: { tr: "Elektron adı verilen ilk sikkeler hangi metallerin alaşımıdır?", en: "What metals are the first coins called electrum an alloy of?" },
                options: { tr: ["Altın ve Gümüş", "Bakır ve Kalay", "Demir ve Çinko", "Altın ve Bakır"], en: ["Gold and Silver", "Copper and Tin", "Iron and Zinc", "Gold and Copper"] },
                correct: 0
            }
        }
    }
];

export const cities = [
    "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir",
    "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli",
    "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkâri",
    "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir",
    "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir",
    "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat",
    "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman",
    "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"
];

export const gameLevels = [
    { id: 'easy', age: '5+', title: { tr: 'Minik Kaşif', en: 'Little Explorer' }, desc: { tr: 'Görsel ipuçları ve eğlenceli görevler.', en: 'Visual clues and fun tasks.' }, icon: <Star size={24} className="text-yellow-400" />, color: 'border-yellow-600 bg-yellow-900/40' },
    { id: 'medium', age: '9+', title: { tr: 'Meraklı Gezgin', en: 'Curious Traveler' }, desc: { tr: 'Gizemli bulmacalar ve keşif rotaları.', en: 'Mysterious puzzles and discovery routes.' }, icon: <Compass size={24} className="text-emerald-400" />, color: 'border-emerald-600 bg-emerald-900/40' },
    { id: 'hard', age: '13+', title: { tr: 'Usta Arkeolog', en: 'Master Archaeologist' }, desc: { tr: 'Zorlu şifreler ve derin tarih bilgisi.', en: 'Challenging codes and deep history knowledge.' }, icon: <Scroll size={24} className="text-amber-400" />, color: 'border-amber-600 bg-amber-900/40' }
];
