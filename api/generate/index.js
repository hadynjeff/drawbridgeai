// api/generate/index.js
const OpenAI = require("openai");

module.exports = async function (context, req) {
  context.log("🔔 generate called with:", req.body);

  const { name, workplaceType, criteria } = req.body || {};
  if (!name || !workplaceType || !criteria) {
    context.res = {
      status: 400,
      headers: { "Content-Type": "text/plain" },
      body: "Missing name, workplaceType or criteria"
    };
    return;
  }

  const key = process.env.OPENAI_API_KEY;
  context.log("🔑 Key loaded?", !!key);
  if (!key) {
    context.res = {
      status: 500,
      headers: { "Content-Type": "text/plain" },
      body: "OPENAI_API_KEY not configured in Azure"
    };
    return;
  }

  const openai = new OpenAI({ apiKey: key });

  // Build your messages
  const systemContent = `
You are tasked with generating 8 off-the-job training activities that are fully ESFA-compliant for a UK apprentice.

Apprenticeship standard: ${name}
Workplace type: ${workplaceType}
Learning focus/criteria: ${criteria}.

Activities must fall into one of the following categories:
- Shadowing
- Research & Presentation Tasks
- Simulation or Role-Play
- Coaching or Mentoring Session with mentor/manager
- Projects
- Discussion
- Reflective Learning Activities
- Practical Skills Development (outside usual day-to-day tasks)
- Workplace secondment/rotation
- Independent Study
- Technical Training

Each activity must:
1. Include a rich, detailed, step-by-step description (150–180 words) with concrete examples and actionable guidance.
2. Use clear, instructional language directed at the learner.
3. Align with the specific KSB: (${criteria}).
4. Be overseen by a mentor or manager with accountability/feedback.
5. Use British English spelling ONLY.
6. Not include attendance or participation in webinars, seminars or workshops.
7. Not mention the impact on the learner.
8. Be compliant with ESFA guidelines regarding off-the-job training.

Return **only** a valid JSON array of 8 objects:
[
  {
    "title": "Short summary (≤100 chars)",
    "description": "Detailed, robust description",
    "time": "estimated time to complete in X hours"
  },
  …
]
`.trim();

  const userContent = `
Standard: ${name}
Workplace: ${workplaceType}
KSB: ${criteria}

Return only the JSON array of 8 items.
`.trim();

  try {
    const resp = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.8,
      messages: [
        { role: "system", content: systemContent },
        { role: "user",   content: userContent   }
      ]
    });

    let txt = resp.choices[0].message.content
      .replace(/```(?:json)?/g, "")
      .trim();
    const start = txt.indexOf("[");
    const end   = txt.lastIndexOf("]") + 1;
    const ideas = JSON.parse(txt.slice(start, end));

    context.res = {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: ideas
    };

  } catch (err) {
    context.log.error("❌ Function error:", err);
    context.res = {
      status: 500,
      headers: { "Content-Type": "text/plain" },
      body: err.message || String(err)
    };
  }
};
