import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { callFunction } from "./function-registry.js";
import { classifyIntent } from "./intent-classifier.js";

// helper for reading file paths in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// helper to split text into tokens
function tokenize(s = "") {
  return s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
}

// loads the Q&A file once
const groundTruthPath = path.join(__dirname, "ground-truth.json");
let groundTruth = [];

try {
  const raw = fs.readFileSync(groundTruthPath, "utf-8");
  groundTruth = JSON.parse(raw);
} catch (err) {
  console.error("❌ Failed to load ground-truth.json:", err);
}

// =====================================
// Main Assistant Engine
// =====================================
export async function askAssistant(prompt) {
  if (!prompt || typeof prompt !== "string") {
    return { text: "Please provide a question or request." };
  }

  // --- 1. classify the user intent ---
  const intent = classifyIntent(prompt);

  // --- 2. handle order-related intents via function calls ---
  if (intent.function) {
    try {
      const fnResult = await callFunction(intent.function, prompt);
      return { text: fnResult.text || fnResult };
    } catch (err) {
      console.error("Assistant function error:", err);
      return { text: "Sorry, I had trouble processing that request." };
    }
  }

  // --- 3. fallback to knowledge base matching ---
  const qTokens = tokenize(prompt);
  let best = null;
  let bestScore = 0;

  for (const qa of groundTruth) {
    const qText = qa.q || qa.question || "";
    const aText = qa.a || qa.answer || "";
    const t = tokenize(qText);
    const overlap = t.filter((x) => qTokens.includes(x)).length;
    if (overlap > bestScore) {
      bestScore = overlap;
      best = { q: qText, a: aText, qid: qa.qid };
    }
  }

  // --- 4. respond based on best match ---
  if (best && bestScore >= 2) {
    return {
      text: `${best.a}${best.qid ? ` [${best.qid}]` : ""}`,
    };
  }

  // --- 5. fallback generic response ---
  return {
    text:
      "Sorry — this is out of scope for the Support panel. I can only answer from our ground-truth Q&A and order status.",
  };
}
