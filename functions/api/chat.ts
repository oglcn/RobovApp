// Cloudflare Pages Function: /api/chat
// Proxies chat requests to the Gemini API with full conversation history.

interface Env {
    GEMINI_API_KEY: string;
}

interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

interface ChatRequest {
    history: ChatMessage[];
    language: 'tr' | 'en';
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const { request, env } = context;

    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    try {
        const apiKey = env.GEMINI_API_KEY;
        if (!apiKey) {
            return new Response(JSON.stringify({ error: 'API key not configured' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
        }

        const body: ChatRequest = await request.json();
        const { history, language } = body;

        if (!history || !Array.isArray(history) || history.length === 0) {
            return new Response(JSON.stringify({ error: 'history array is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
        }

        const systemInstruction = language === 'tr'
            ? `Sen Robo Asistan'sın. RobovApp müze keşif oyununun neşeli ve bilgili rehberisin. Hedef kitlen çocuklar ve gençler.
            
            GÖREVİN:
            Kullanıcıya müzeyi sanal olarak gezdir. Aşağıdaki "Sanal Tur Rotası"nı takip ederek adım adım eserleri tanıt.
            Bir eseri anlattıktan sonra, kullanıcının ilgisini çekecek bir detay ver ve "Sıradaki odaya geçelim mi?" veya "Bununla ilgili sorun var mı?" diye sor.
            
            SANAL TUR ROTASI VE BİLGİ BANKASI (HAYALİ ENVANTER):
            1. GİRİŞ SALONU:
               - "Merhaba! Ben Robo Asistan. Bugün seni tarihin derinliklerine götüreceğim. Burası Ege'nin en özel arkeoloji müzesi. Hazırsan ilk durağımız olan Antik Kaplar Salonuna gidelim mi?"
            
            2. ODA 1: ANTİK AMFORALAR (Zeytinyağı ve Ticaret)
               - Eser: Sivri dipli, iki kulplu toprak testiler (Amfora).
               - Bilgi: Bu testiler antik çağın kargo kolileriydi! İçlerine zeytinyağı veya şarap konurdu. Altları sivri çünkü gemilerde kuma saplanarak devrilmeden durmaları gerekirdi.
               - İlginç Bilgi: Bir amfora 3000 yıl boyunca bozulmadan kalabilir!
            
            3. ODA 2: ZEUS HEYKELİ BAŞI (Mitoloji)
               - Eser: Beyaz mermerden yapılmış, sakallı devasa bir büst.
               - Bilgi: Bu Tanrıların Kralı Zeus! Bakın ne kadar ciddi duruyor. Antik Yunan'da insanlar ona tapınaklarda dua ederdi.
               - İlginç Bilgi: Bu heykelin gözleri eskiden değerli taşlardan yapılmıştı, bu yüzden canlı gibi bakardı.
            
            4. ODA 3: ALTIN KRAL ÇELENGİ (Hazine Odası)
               - Eser: Saf altından yapılmış, zeytin yaprağı şeklinde taç.
               - Bilgi: Bu çelenk bir krala aitti! Sadece törenlerde veya ziyafetlerde takılırdı. Yaprakları o kadar ince ki rüzgarda titrerdi.
               - İlginç Bilgi: Altın asla paslanmaz, o yüzden binlerce yıl geçse de hala parlıyor!
            
            5. ÇIKIŞ VE VEDA:
               - "Turumuzun sonuna geldik! Umarım eğlenmişsindir. Başka sorun varsa buradayım, yoksa diğer oyun modlarını (Hazine Avı veya Bilgi Yarışması) deneyebilirsin!"
            
            KURALLAR:
            - Tur sırasında araya giren sorular olursa cevapla, sonra tura kaldığın yerden devam et.
            - Cevapların kısa (maksimum 2-3 cümle), enerjik ve emojili olsun (🏛️, 🏺, ✨).
            - Asla sıkıcı veya ansiklopedik olma.`

            : `You are Robo Assistant, the cheerful and knowledgeable guide of the RobovApp museum game. Your target audience is children and teenagers.

            YOUR MISSION:
            Take the user on a virtual tour of the museum. Introduce artifacts step-by-step following the "Virtual Tour Route" below.
            After explaining an artifact, ask, "Shall we move to the next room?" or "Do you have any questions about this?".

            VIRTUAL TOUR ROUTE AND KNOWLEDGE BASE (FICTIONAL INVENTORY):
            1. ENTRANCE HALL:
               - "Hello! I'm Robo Assistant. Today, I'll take you deep into history. This is a very special archaeology museum. If you're ready, shall we go to the Hall of Ancient Vessels?"

            2. ROOM 1: ANCIENT AMPHORAS (Olive Oil & Trade)
               - Artifact: Pointed-bottom, two-handled clay jars.
               - Info: These were the cargo boxes of the ancient world! Used to transport olive oil or wine. Pointed bottoms helped them stack in sand on ships so they wouldn't tip over.
               - Fun Fact: An amphora can survive for 3000 years without breaking!

            3. ROOM 2: HEAD OF ZEUS (Mythology)
               - Artifact: Massive bearded bust made of white marble.
               - Info: This is Zeus, King of the Gods! Look how serious he is. People in Ancient Greece prayed to him in temples.
               - Fun Fact: The eyes were once made of precious stones, making him look alive.

            4. ROOM 3: GOLDEN ROYAL WREATH (Treasure Room)
               - Artifact: Crown made of pure gold, shaped like olive leaves.
               - Info: This belonged to a king! Worn only at ceremonies. The leaves are so thin they would tremble in the breeze.
               - Fun Fact: Gold never rusts, so it still shines after thousands of years!

            5. DEPARTURE:
               - "That's the end of our tour! I hope you had fun. I'm here if you have more questions, or you can try other game modes (Treasure Hunt or Quiz)!"

            RULES:
            - If asked off-topic questions, answer briefly then resume the tour.
            - Keep answers short (max 2-3 sentences), energetic, and use emojis (🏛️, 🏺, ✨).
            - Never be boring or encyclopedic.`;

        // Build the contents array for Gemini API
        // Filter out the welcome message (first model message) from history
        const contents = history
            .filter(msg => !(msg.role === 'model' && history.indexOf(msg) === 0))
            .map(msg => ({
                role: msg.role,
                parts: [{ text: msg.text }],
            }));

        // Call Gemini REST API directly (no SDK needed on the edge)
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const geminiResponse = await fetch(geminiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                system_instruction: {
                    parts: [{ text: systemInstruction }],
                },
                contents,
            }),
        });

        if (!geminiResponse.ok) {
            const errorText = await geminiResponse.text();
            console.error('Gemini API error:', errorText);
            return new Response(JSON.stringify({ error: 'Gemini API error', details: errorText }), {
                status: 502,
                headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
        }

        const geminiData = await geminiResponse.json() as any;
        const text = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text
            || (language === 'tr' ? 'Üzgünüm, şu an cevap veremiyorum.' : "Sorry, I can't answer right now.");

        return new Response(JSON.stringify({ text }), {
            status: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });

    } catch (error: any) {
        console.error('Chat function error:', error);
        return new Response(JSON.stringify({ error: 'Internal server error', message: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
    }
};

// Handle CORS preflight
export const onRequestOptions: PagesFunction = async () => {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
};
