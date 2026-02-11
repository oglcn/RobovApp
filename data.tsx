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
        selectedMuseumLabel: "Seçili Müze"
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
        selectedMuseumLabel: "Selected Museum"
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

export const artifactDatabase: Artifact[] = [
    {
        id: 1,
        qrCode: "KOSTEM_ART_1",
        name: { tr: "Taş Değirmen", en: "Stone Mill" },
        museums: ["Köstem Zeytinyağı Müzesi", "İzmir"],
        image: "https://images.unsplash.com/photo-1590016023401-4c04ba47deef?auto=format&fit=crop&q=80&w=600",
        hint: { tr: "Kocaman ve ağır taşlarım var, zeytinleri ezerim.", en: "I have huge heavy stones, I crush olives." },
        inspectionQuestion: {
            text: { tr: "Taş değirmenin ortasındaki büyük taş neden yuvarlak şekildedir?", en: "Why is the big stone in the center of the stone mill round?" },
            options: { tr: ["Dönerek zeytinleri ezmek için", "Daha güzel görünmesi için", "Taşınması kolay olsun diye", "Dekoratif amaçlıdır"], en: ["To crush olives by rotating", "To look better", "To be easier to carry", "For decoration"] },
            correct: 0
        },
        questions: {
            easy: {
                text: { tr: "Taş değirmen ne için kullanılır?", en: "What is a stone mill used for?" },
                options: { tr: ["Zeytinleri ezmek için", "Un öğütmek için", "Odun kesmek için", "Su taşımak için"], en: ["To crush olives", "To grind flour", "To cut wood", "To carry water"] },
                correct: 0
            },
            medium: {
                text: { tr: "Taş değirmeni döndürmek için eskiden hangi güç kullanılırdı?", en: "What power was used to turn stone mills in the past?" },
                options: { tr: ["Hayvan gücü (eşek/at)", "Elektrik", "Buhar", "Rüzgar"], en: ["Animal power (donkey/horse)", "Electricity", "Steam", "Wind"] },
                correct: 0
            },
            hard: {
                text: { tr: "Taş değirmenlerde kullanılan büyük alt taşa ne ad verilir?", en: "What is the large bottom stone in stone mills called?" },
                options: { tr: ["Ana taş (meta)", "Kapak taşı", "Kırma taşı", "Döner taş"], en: ["Base stone (meta)", "Cover stone", "Crushing stone", "Rotating stone"] },
                correct: 0
            }
        }
    },
    {
        id: 2,
        qrCode: "KOSTEM_ART_2",
        name: { tr: "Ahşap Baskı Presi", en: "Wooden Screw Press" },
        museums: ["Köstem Zeytinyağı Müzesi", "İzmir"],
        image: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&q=80&w=600",
        hint: { tr: "Ahşap kollarımla sıkıştırır, altın renkli yağı süzdürürüm.", en: "I squeeze with my wooden arms, filtering golden oil." },
        inspectionQuestion: {
            text: { tr: "Bu presin ahşap vidası hangi yönde çevrilerek baskı uygulanır?", en: "Which direction is the wooden screw turned to apply pressure?" },
            options: { tr: ["Saat yönünde", "Saat yönünün tersine", "Yukarı aşağı", "İleri geri"], en: ["Clockwise", "Counterclockwise", "Up and down", "Back and forth"] },
            correct: 0
        },
        questions: {
            easy: {
                text: { tr: "Ezilmiş zeytinlerden yağı çıkarmak için ne yapılır?", en: "What is done to extract oil from crushed olives?" },
                options: { tr: ["Preste sıkıştırılır", "Ateşte kaynatılır", "Güneşte kurutulur", "Suya atılır"], en: ["Pressed in a press", "Boiled over fire", "Dried in the sun", "Thrown in water"] },
                correct: 0
            },
            medium: {
                text: { tr: "Baskı preslerinde zeytinler neyin içine konularak sıkıştırılırdı?", en: "What were olives placed in before being pressed?" },
                options: { tr: ["Keçi kılından torbalara (baskı çuvalı)", "Demir kovalara", "Cam kavanozlara", "Tahta kutulara"], en: ["Goat hair bags (press bag)", "Iron buckets", "Glass jars", "Wooden boxes"] },
                correct: 0
            },
            hard: {
                text: { tr: "Vidalı baskı presinin icadı hangi medeniyete atfedilir?", en: "Which civilization is the invention of the screw press attributed to?" },
                options: { tr: ["Antik Roma", "Hitit", "Osmanlı", "Antik Mısır"], en: ["Ancient Rome", "Hittite", "Ottoman", "Ancient Egypt"] },
                correct: 0
            }
        }
    },
    {
        id: 3,
        qrCode: "KOSTEM_ART_3",
        name: { tr: "Zeytinyağı Küpü", en: "Olive Oil Pithos" },
        museums: ["Köstem Zeytinyağı Müzesi", "İzmir"],
        image: "https://images.unsplash.com/photo-1544211681-37ff44f2d346?auto=format&fit=crop&q=80&w=600",
        hint: { tr: "Topraktan yapılmış büyük karnım var, içimde altın sıvı saklarım.", en: "I have a big belly made of clay, I store golden liquid inside." },
        inspectionQuestion: {
            text: { tr: "Bu küpün dış yüzeyinde görülen koyu lekeler neden oluşmuştur?", en: "Why are there dark stains on the outer surface of this pithos?" },
            options: { tr: ["Yıllar boyunca yağ sızması", "Boya ile süsleme", "Toprak rengi", "Yangın izi"], en: ["Oil leaking over years", "Paint decoration", "Soil color", "Fire marks"] },
            correct: 0
        },
        questions: {
            easy: {
                text: { tr: "Zeytinyağı saklamak için kullanılan büyük toprak kaplara ne denir?", en: "What are the large clay containers used to store olive oil called?" },
                options: { tr: ["Küp", "Tencere", "Bardak", "Tabak"], en: ["Pithos", "Pot", "Glass", "Plate"] },
                correct: 0
            },
            medium: {
                text: { tr: "Zeytinyağı küpleri neden genellikle toprağa yarı gömülü olarak saklanırdı?", en: "Why were olive oil pithoi usually stored half-buried in the ground?" },
                options: { tr: ["Serin tutmak ve yağı korumak için", "Deprem olmasın diye", "Fare girmesin diye", "Daha güzel görünsün diye"], en: ["To keep cool and preserve the oil", "To prevent earthquakes", "To keep mice out", "To look better"] },
                correct: 0
            },
            hard: {
                text: { tr: "Antik dönemde zeytinyağı küplerinin iç yüzeyi ne ile kaplanarak sızdırmazlık sağlanırdı?", en: "What was used to coat the inner surface of olive oil pithoi in ancient times for sealing?" },
                options: { tr: ["Balmumu veya reçine", "Zeytinyağı", "Kireç", "Kil"], en: ["Beeswax or resin", "Olive oil", "Lime", "Clay"] },
                correct: 0
            }
        }
    },
    {
        id: 4,
        qrCode: "KOSTEM_ART_4",
        name: { tr: "Bakır Kazan", en: "Copper Cauldron" },
        museums: ["Köstem Zeytinyağı Müzesi", "İzmir"],
        image: "https://images.unsplash.com/photo-1595854341625-f2273f52d1b3?auto=format&fit=crop&q=80&w=600",
        hint: { tr: "Parlak ve kırmızımsı rengim var, sıcak suyla yağı ayırırım.", en: "I have a shiny reddish color, I separate oil with hot water." },
        inspectionQuestion: {
            text: { tr: "Bakır kazanın altında görülen kararmalar neyin izleridir?", en: "What are the dark marks under the copper cauldron traces of?" },
            options: { tr: ["Ateş/is izleri", "Pas izleri", "Boya kalıntısı", "Yapıştırıcı"], en: ["Fire/soot marks", "Rust marks", "Paint remnants", "Glue"] },
            correct: 0
        },
        questions: {
            easy: {
                text: { tr: "Zeytinyağı üretiminde bakır kazan ne için kullanılırdı?", en: "What was the copper cauldron used for in olive oil production?" },
                options: { tr: ["Yağı sudan ayırmak için", "Zeytin toplamak için", "Yemek pişirmek için", "Su taşımak için"], en: ["To separate oil from water", "To collect olives", "To cook food", "To carry water"] },
                correct: 0
            },
            medium: {
                text: { tr: "Zeytinyağı neden suyun üstünde kalır?", en: "Why does olive oil float on top of water?" },
                options: { tr: ["Yoğunluğu sudan az olduğu için", "Sıcak olduğu için", "Tuzlu olduğu için", "Hafif olduğu için"], en: ["Because its density is less than water", "Because it's hot", "Because it's salty", "Because it's light"] },
                correct: 0
            },
            hard: {
                text: { tr: "Yağ ve suyun yoğunluk farkından yararlanarak ayrıştırma işlemine ne denir?", en: "What is the process of separation using the density difference between oil and water called?" },
                options: { tr: ["Dekantasyon", "Damıtma", "Filtrasyon", "Kristalizasyon"], en: ["Decantation", "Distillation", "Filtration", "Crystallization"] },
                correct: 0
            }
        }
    },
    {
        id: 5,
        qrCode: "KOSTEM_ART_5",
        name: { tr: "Yağhane Kandili", en: "Oil House Lamp" },
        museums: ["Köstem Zeytinyağı Müzesi", "İzmir"],
        image: "https://images.unsplash.com/photo-1548516635-e93e3b8bbf23?auto=format&fit=crop&q=80&w=600",
        hint: { tr: "Küçücüğüm ama karanlıkta parlak ışık veririm, yakıtım zeytin.", en: "I am tiny but I give bright light in the dark, my fuel is olive." },
        inspectionQuestion: {
            text: { tr: "Kandilin çanak kısmında görülen siyah izler neyin kalıntısıdır?", en: "What are the black marks in the lamp's bowl remnants of?" },
            options: { tr: ["Fitil yanma izi (kurum)", "Boya", "Toprak", "Pas"], en: ["Wick burn marks (soot)", "Paint", "Dirt", "Rust"] },
            correct: 0
        },
        questions: {
            easy: {
                text: { tr: "Elektrik icat edilmeden önce zeytinyağı ne için de kullanılırdı?", en: "Before electricity was invented, what else was olive oil used for?" },
                options: { tr: ["Aydınlatma (kandil)", "Boya yapımı", "İnşaat", "Ulaşım"], en: ["Lighting (oil lamp)", "Paint making", "Construction", "Transportation"] },
                correct: 0
            },
            medium: {
                text: { tr: "Antik çağda zeytinyağı kandillerinde fitil olarak ne kullanılırdı?", en: "What was used as a wick in ancient olive oil lamps?" },
                options: { tr: ["Keten veya pamuk ipliği", "Metal tel", "Tahta çubuk", "Cam parçası"], en: ["Linen or cotton thread", "Metal wire", "Wooden stick", "Glass piece"] },
                correct: 0
            },
            hard: {
                text: { tr: "Zeytinyağı, yemek ve aydınlatma dışında antik çağda dini törenlerde ne amaçla kullanılırdı?", en: "Besides food and lighting, what was olive oil used for in ancient religious ceremonies?" },
                options: { tr: ["Mesh/kutsal yağlama", "Boya yapımı", "Para basımı", "İnşaat harcı"], en: ["Anointing", "Paint making", "Coin minting", "Construction mortar"] },
                correct: 0
            }
        }
    },
    {
        id: 6,
        qrCode: "KOSTEM_ART_6",
        name: { tr: "Sabun İmalathanesi", en: "Soap Workshop" },
        museums: ["Köstem Zeytinyağı Müzesi", "İzmir"],
        image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&q=80&w=600",
        hint: { tr: "Zeytinyağından doğarım, köpüklü ve temizim.", en: "I am born from olive oil, foamy and clean." },
        inspectionQuestion: {
            text: { tr: "Sabun kalıplarının üzerindeki damga ne anlama gelir?", en: "What does the stamp on the soap molds mean?" },
            options: { tr: ["Üreticinin markası", "Ağırlığı", "Tarihi", "Rengi"], en: ["Producer's brand", "Weight", "Date", "Color"] },
            correct: 0
        },
        questions: {
            easy: {
                text: { tr: "Zeytinyağından sadece yemek mi yapılır?", en: "Is olive oil only used for cooking?" },
                options: { tr: ["Hayır, sabun da yapılır", "Evet, sadece yemek", "Sadece ilaç", "Sadece boya"], en: ["No, soap is also made", "Yes, only food", "Only medicine", "Only paint"] },
                correct: 0
            },
            medium: {
                text: { tr: "Zeytinyağı sabunu yapımında zeytinyağı hangi madde ile karıştırılır?", en: "What is olive oil mixed with to make olive oil soap?" },
                options: { tr: ["Kostik soda (sodyum hidroksit)", "Şeker", "Tuz", "Sirke"], en: ["Caustic soda (sodium hydroxide)", "Sugar", "Salt", "Vinegar"] },
                correct: 0
            },
            hard: {
                text: { tr: "Zeytinyağlı sabun üretiminde Akdeniz'in en ünlü geleneksel merkezlerinden biri neresidir?", en: "Which is one of the most famous traditional centers of olive oil soap production in the Mediterranean?" },
                options: { tr: ["Halep (Suriye)", "Kahire (Mısır)", "Roma (İtalya)", "Atina (Yunanistan)"], en: ["Aleppo (Syria)", "Cairo (Egypt)", "Rome (Italy)", "Athens (Greece)"] },
                correct: 0
            }
        }
    }
];

export const genericArtifacts: Artifact[] = [
    {
        id: 101,
        qrCode: "KOSTEM_BONUS_1",
        name: { tr: "Zeytin Hasadı Aletleri", en: "Olive Harvesting Tools" },
        image: "https://images.unsplash.com/photo-1501004318855-fce75bfce3dc?auto=format&fit=crop&q=80&w=600",
        hint: { tr: "Dallardan zeytinleri düşürürüm, sepetlere doldururum.", en: "I knock olives off branches, fill them into baskets." },
        inspectionQuestion: {
            text: { tr: "Toplama sırığının ucundaki tarak ne işe yarar?", en: "What is the comb at the end of the harvesting pole used for?" },
            options: { tr: ["Dallardan zeytinleri taramak", "Ağacı kesmek", "Toprağı kazmak", "Sepet örmek"], en: ["To comb olives off branches", "To cut the tree", "To dig soil", "To weave baskets"] },
            correct: 0
        },
        questions: {
            easy: {
                text: { tr: "Zeytinler ağaçtan nasıl toplanır?", en: "How are olives collected from trees?" },
                options: { tr: ["Dallar silkelenerek veya elle", "Suda yüzdürülerek", "Makinayla kazılarak", "Rüzgarla uçurularak"], en: ["By shaking branches or by hand", "By floating in water", "By digging with machines", "By blowing with wind"] },
                correct: 0
            },
            medium: {
                text: { tr: "Zeytin hasadı genellikle yılın hangi aylarında yapılır?", en: "In which months of the year is olive harvesting usually done?" },
                options: { tr: ["Ekim-Aralık", "Mart-Mayıs", "Haziran-Temmuz", "Ocak-Şubat"], en: ["October-December", "March-May", "June-July", "January-February"] },
                correct: 0
            },
            hard: {
                text: { tr: "Bir zeytin ağacı ortalama kaç yıl yaşayabilir?", en: "How many years can an olive tree live on average?" },
                options: { tr: ["500 yıldan fazla", "50 yıl", "10 yıl", "100 yıl"], en: ["More than 500 years", "50 years", "10 years", "100 years"] },
                correct: 0
            }
        }
    },
    {
        id: 102,
        qrCode: "KOSTEM_BONUS_2",
        name: { tr: "Amfora", en: "Amphora" },
        image: "https://images.unsplash.com/photo-1544211681-37ff44f2d346?auto=format&fit=crop&q=80&w=600",
        hint: { tr: "İki kulpum var, denizden geldim, zeytinyağı taşıdım.", en: "I have two handles, came from the sea, carried olive oil." },
        inspectionQuestion: {
            text: { tr: "Amforanın alt kısmı neden sivri yapılmıştır?", en: "Why is the bottom of the amphora made pointed?" },
            options: { tr: ["Gemiye veya toprağa saplamak için", "Daha güzel görünmesi için", "Daha çok sıvı alması için", "Taşıması kolay olsun diye"], en: ["To stick into ship hull or ground", "To look better", "To hold more liquid", "To be easier to carry"] },
            correct: 0
        },
        questions: {
            easy: {
                text: { tr: "Antik çağda zeytinyağı nasıl taşınırdı?", en: "How was olive oil transported in ancient times?" },
                options: { tr: ["Amfora denilen kaplarla", "Plastik şişeyle", "Kağıt poşetle", "Cam kavanozla"], en: ["In vessels called amphoras", "In plastic bottles", "In paper bags", "In glass jars"] },
                correct: 0
            },
            medium: {
                text: { tr: "Amforaların üzerindeki damgalar ne bilgisi verirdi?", en: "What information did the stamps on amphoras provide?" },
                options: { tr: ["Üretim yeri ve üretici", "Hava durumu", "Geminin adı", "Denizin derinliği"], en: ["Place and producer", "Weather", "Ship's name", "Sea depth"] },
                correct: 0
            },
            hard: {
                text: { tr: "Akdeniz'de batık gemilerde en çok bulunan eser tipi hangisidir?", en: "What is the most commonly found artifact type in Mediterranean shipwrecks?" },
                options: { tr: ["Amfora", "Heykel", "Mozaik", "Sikke"], en: ["Amphora", "Statue", "Mosaic", "Coin"] },
                correct: 0
            }
        }
    }
];

export const cities = [
    "İzmir"
];

export const gameLevels = [
    { id: 'easy', age: '5+', title: { tr: 'Minik Kaşif', en: 'Little Explorer' }, desc: { tr: 'Görsel ipuçları ve eğlenceli görevler.', en: 'Visual clues and fun tasks.' }, icon: <Star size={24} className="text-yellow-400" />, color: 'border-yellow-600 bg-yellow-900/40' },
    { id: 'medium', age: '9+', title: { tr: 'Meraklı Gezgin', en: 'Curious Traveler' }, desc: { tr: 'Gizemli bulmacalar ve keşif rotaları.', en: 'Mysterious puzzles and discovery routes.' }, icon: <Compass size={24} className="text-emerald-400" />, color: 'border-emerald-600 bg-emerald-900/40' },
    { id: 'hard', age: '13+', title: { tr: 'Usta Araştırmacı', en: 'Master Researcher' }, desc: { tr: 'Zorlu sorular ve derin bilgi.', en: 'Challenging questions and deep knowledge.' }, icon: <Scroll size={24} className="text-amber-400" />, color: 'border-amber-600 bg-amber-900/40' }
];
