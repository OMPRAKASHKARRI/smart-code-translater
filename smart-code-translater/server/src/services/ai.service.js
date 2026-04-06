import dotenv from "dotenv";
import Groq from "groq-sdk";
import { getPromptByType, SYSTEM_PROMPT } from "../utils/prompt.js";
import { SUPPORTED_LANGUAGES, REQUEST_TYPES } from "../constants/prompt.js";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

class AIService {
  async processCodeRequest(code, language, requestType, additionalContext = "") {
    try {
      // ✅ Validation
      if (!code || !language || !requestType) {
        throw new Error("Missing required parameters");
      }

      if (!SUPPORTED_LANGUAGES[language.toUpperCase()]) {
        throw new Error(`Unsupported language: ${language}`);
      }

      if (!REQUEST_TYPES[requestType.toUpperCase()]) {
        throw new Error(`Unsupported request type: ${requestType}`);
      }

      // ✅ Prompt
      const prompt = getPromptByType(
        requestType,
        code,
        language,
        additionalContext
      );

      const fullPrompt = `${SYSTEM_PROMPT}\n\n${prompt}`;

      // ✅ GROQ API CALL
      const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant", // 🔥 best free model
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: fullPrompt,
          },
        ],
      });

      const text =
        completion?.choices?.[0]?.message?.content || "No response from AI";

      return {
        success: true,
        response: text,
        metadata: {
          language,
          requestType,
          timestamp: new Date(),
          model: "llama3-70b-8192",
        },
      };
    } catch (error) {
      console.error("AI Service Error:", error);

      return {
        success: false,
        error: error.message,
        metadata: {
          language,
          requestType,
          timestamp: new Date(),
        },
      };
    }
  }

  async debugCode(code, language, error) {
    return this.processCodeRequest(code, language, "debug", error);
  }

  async explainCode(code, language) {
    return this.processCodeRequest(code, language, "explain");
  }

  async optimizeCode(code, language) {
    return this.processCodeRequest(code, language, "optimize");
  }

  async reviewCode(code, language) {
    return this.processCodeRequest(code, language, "review");
  }

  async generateTests(code, language) {
    return this.processCodeRequest(code, language, "test");
  }

  async analyzeExecution(code, language, userRequest) {
    return this.processCodeRequest(code, language, "execute", userRequest);
  }

  async generateDocumentation(code, language) {
    return this.processCodeRequest(code, language, "document");
  }

  async refactorCode(code, language) {
    return this.processCodeRequest(code, language, "refactor");
  }
}

export default new AIService();