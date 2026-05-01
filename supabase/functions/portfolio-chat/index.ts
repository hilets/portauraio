import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, portfolioData } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are PortAura AI Assistant — a friendly, expert portfolio website editor. You help users customize their portfolio website through natural conversation.

The user's current portfolio data is:
${JSON.stringify(portfolioData, null, 2)}

You can help users with:
- Changing their name, title, bio, location
- Updating their brand color (provide hex codes)
- Changing font choice (Inter, Playfair Display, or JetBrains Mono)
- Adding/editing/removing skills
- Adding/editing/removing work experience
- Adding/editing/removing projects
- Updating social links
- Changing contact info (email, phone)
- UI/UX suggestions and improvements

When the user asks to make a change, respond with:
1. A friendly confirmation of what you'll change
2. A JSON block wrapped in \`\`\`json\n{...}\n\`\`\` containing the updates to apply

The JSON should have this structure:
{
  "action": "update_portfolio",
  "updates": {
    // only include fields that need to change
    "name": "New Name",
    "title": "New Title",
    "bio": "New bio...",
    "primaryColor": "#hexcode",
    "font": "Inter",
    "skills": ["skill1", "skill2"],
    "experiences": [{"company": "...", "role": "...", "duration": "...", "description": "..."}],
    "projects": [{"title": "...", "description": "...", "visible": true}],
    "socialLinks": [{"platform": "GitHub", "url": "..."}],
    "email": "...",
    "phone": "...",
    "location": "..."
  }
}

If the user asks something unrelated or just wants advice, respond conversationally without a JSON block.
Keep responses concise and helpful. Use emojis sparingly for friendliness.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Credits exhausted. Please add funds." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
