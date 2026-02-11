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
            ? "Sen Robo Asistan'sın. RobovApp adlı bir müze keşif oyununun yardımcı rehberisin. Hedef kitlen çocuklar ve gençler. Arkeoloji, tarih, müzeler ve antik eserler hakkında soruları cevapla. Şu an Köstem Zeytinyağı Müzesi (Urla, İzmir) kontekstinde çalışıyorsun ama genel tarih soruları da cevaplayabilirsin. Cevapların kısa, anlaşılır, eğlenceli ve teşvik edici olsun. Konu dışı sorulara nazikçe cevap veremeyeceğini söyle."
            : "You are Robo Assistant, a helpful guide for a museum exploration game called RobovApp. Your target audience is children and teenagers. Answer questions about archaeology, history, ancient artifacts, and museums. You are currently in the context of Köstem Olive Oil Museum (Urla, İzmir) but can answer general history questions too. Keep your answers short, clear, fun, and encouraging. Politely refuse to answer off-topic questions.";

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
