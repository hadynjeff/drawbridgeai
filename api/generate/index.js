// api/generate.js
import OpenAI from "openai";

export default async function (context, req) {
  const { name, workplaceType, criteria } = req.body;
  if (!name || !workplaceType || !criteria) {
    context.res = { status: 400, body: "Missing name, workplaceType or criteria" };
    return;
  }

  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    context.res = { status: 500, body: "OPENAI_API_KEY not configured" };
    return;
  }

  const openai = new OpenAI({ apiKey: key });

  // 1) Build your system & user messages exactly as before
  const systemContent = `
You are tasked with generating 8 off-the-job training activities that are fully ESFA-compliant for a UK apprentice.

Apprenticeship standard: ${name}
Workplace type: ${workplaceType}
Learning focus/criteria: ${criteria}.

Activities must fall into one of the following categories:
- Shadowing
- Research & Presentation Tasks
- Simulation or Role-Play
- Coaching or Mentoring Session
- Projects
- Discussion
- Reflective Learning
- Practical Skills Development
- Workplace secondment/rotation
- Independent Study
- Technical Training

Each activity must:
1. Include a detailed description (110–150 words).
2. Use clear learner-focused language.
3. Align with the KSB: (${criteria}).
4. Be overseen by a mentor/manager.
5. Use British English spelling ONLY.
6. Exclude webinars/seminars/workshops.
7. Not mention learner impact.
8. Be ESFA-compliant.

Return a valid JSON array of 8 objects:
[
  {
    "title":"Short summary (≤100 chars)",
    "description":"Detailed, robust description",
    "time":"X hours"
  },
  …
]
  `.trim();

  const userContent = 
`Standard: ${name}
Workplace: ${workplaceType}
KSB: ${criteria}

Return only the JSON array of 8 items.`;

  try {
    const resp = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.8,
      messages: [
        { role: "system", content: systemContent },
        { role: "user",   content: userContent   }
      ]
    });

    // Extract the JSON from the LLM reply
    let text = resp.choices[0].message.content
      .replace(/```(?:json)?/g, "")
      .trim();
    const start = text.indexOf("[");
    const end   = text.lastIndexOf("]") + 1;
    const ideas = JSON.parse(text.slice(start, end));

    context.res = {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: ideas
    };
  } catch (err) {
    context.res = {
      status: err.status || 500,
      body: { error: err.message || err }
    };
  }
}
