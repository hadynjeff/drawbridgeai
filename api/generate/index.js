// api/generate/index.js
const OpenAI = require("openai");

module.exports = async function (context, req) {
  context.log("🔔 generate invoked with body:", req.body);

  const { name, workplaceType, criteria } = req.body || {};
  if (!name || !workplaceType || !criteria) {
    context.res = { status: 400, body: "Missing name, workplaceType or criteria" };
    return;
  }

  const key = process.env.OPENAI_API_KEY;
  context.log("🔑 Key present?", !!key);
  if (!key) {
    context.res = { status: 500, body: "OPENAI_API_KEY not configured in Azure" };
    return;
  }

  const openai = new OpenAI({ apiKey: key });

  const systemContent = `
You are tasked with generating 8 off-the-job training activities…

Standard: ${name}
Workplace: ${workplaceType}
KSB: ${criteria}

Return only a JSON array of 8 objects.
`.trim();

  try {
    const resp = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.8,
      messages: [
        { role: "system", content: systemContent },
        { role: "user", content: "Return only the JSON array of 8 items." }
      ]
    });

    let txt = resp.choices[0].message.content
      .replace(/```(?:json)?/g, "")
      .trim();
    const start = txt.indexOf("["),
          end   = txt.lastIndexOf("]") + 1;
    const ideas = JSON.parse(txt.slice(start, end));

    context.res = {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: ideas
    };

  } catch (err) {
    // Return the full error message & stack trace
    context.log.error("❌ Function error:", err);
    context.res = {
      status: 500,
      body: `Error: ${err.message}\nStack:\n${err.stack}`
    };
  }
};
