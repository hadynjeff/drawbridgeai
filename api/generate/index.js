// api/generate/index.js
const OpenAI = require("openai");   // use require for Azure Functions
module.exports = async function (context, req) {
  context.log("⚡️ /api/generate called with body:", req.body);

  const { name, workplaceType, criteria } = req.body || {};
  if (!name || !workplaceType || !criteria) {
    context.log("❌ Missing inputs", req.body);
    context.res = { status: 400, body: "Missing name, workplaceType or criteria" };
    return;
  }

  const key = process.env.OPENAI_API_KEY;
  context.log("🔑 OPENAI_API_KEY present?", !!key);
  if (!key) {
    context.res = { status: 500, body: "Server error: OPENAI_API_KEY not configured" };
    return;
  }

  const openai = new OpenAI({ apiKey: key });

  const systemContent = `
You are tasked with generating 8 off-the-job training activities that are fully ESFA-compliant for a UK apprentice.

Apprenticeship standard: ${name}
Workplace type: ${workplaceType}
Learning focus/criteria: ${criteria}

Return a JSON array of 8 objects:
[
  {"title":"…","description":"…","time":"…"},
  …
]
`.trim();

  try {
    const resp = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.8,
