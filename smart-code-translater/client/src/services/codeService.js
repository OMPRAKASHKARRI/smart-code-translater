import api from "./api";

// ✅ Explain
export const explainCode = (code, language) => {
  return api.post("/code/explain", {
    code: String(code),        // 🔥 force string
    language: String(language)
  });
};

// ✅ Debug
export const debugCode = (code, language, error) => {
  return api.post("/code/debug", {
    code: String(code),
    language: String(language),
    error: String(error)
  });
};

// ✅ Optimize
export const optimizeCode = (code, language) => {
  return api.post("/code/optimize", {
    code: String(code),
    language: String(language)
  });
};