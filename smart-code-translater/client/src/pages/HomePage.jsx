import { useState } from "react";
import toast from "react-hot-toast";
import CodeEditor from "../components/CodeEditor.jsx";
import LanguageSelector from "../components/LanguageSelector.jsx";
import { STARTER_CODE } from "../constants/language.js";
import {
  explainCode,
  debugCode,
  optimizeCode,
} from "../services/codeService.js";
import "../styles/home.css";

const ACTIONS = [
  { id: "explain", label: "Explain Code", icon: "📚" },
  { id: "debug", label: "Debug Code", icon: "🔧" },
  { id: "optimize", label: "Optimize Code", icon: "⚡" },
];

function HomePage() {
  const [code, setCode] = useState(
    STARTER_CODE.python || 'print("Hello, World!")'
  );
  const [language, setLanguage] = useState("python");
  const [activeAction, setActiveAction] = useState("explain");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ COPY FUNCTION (FIXED)
  const copyResult = async () => {
    if (!result) {
      toast.error("Nothing to copy");
      return;
    }

    try {
      await navigator.clipboard.writeText(result);
      toast.success("Copied! 📋");
    } catch {
      toast.error("Copy failed");
    }
  };

  const handleAction = async () => {
    if (!code.trim()) {
      toast.error("Please enter some code first");
      return;
    }

    setLoading(true);
    setError("");

    // instant UI feedback
    setResult("Hello, World! 🚀\n\nProcessing your code...");

    try {
      let response;

      switch (activeAction) {
        case "explain":
          response = await explainCode(code, language);
          break;
        case "debug":
          response = await debugCode(code, language, "Debug this code");
          break;
        case "optimize":
          response = await optimizeCode(code, language);
          break;
        default:
          response = await explainCode(code, language);
      }

      if (response.data.success) {
        setResult(response.data.response);
        toast.success("Done!");
      } else {
        setError(response.data.error || "Processing failed");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
      toast.error("Error processing code");
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(STARTER_CODE[newLanguage] || 'print("Hello, World!")');
    setResult(null);
    setError("");
  };

  const clearResult = () => {
    setResult(null);
    setError("");
  };

  return (
    <div className="home-page">
      <div className="main">

        {/* LEFT - CODE */}
        <div className="editor-box">
          <LanguageSelector
            language={language}
            onLanguageChange={handleLanguageChange}
          />

          <CodeEditor
            code={code}
            language={language}
            onChange={setCode}
          />
        </div>

        {/* MIDDLE - ACTIONS */}
        <div className="actions-box">
          <h3>Actions</h3>

          {ACTIONS.map((action) => (
            <button
              key={action.id}
              className={activeAction === action.id ? "active" : ""}
              onClick={() => setActiveAction(action.id)}
            >
              {action.icon} {action.label}
            </button>
          ))}

          <button className="run-btn" onClick={handleAction}>
            🚀 Run
          </button>
        </div>

        {/* RIGHT - OUTPUT */}
        <div className="output-box">
          <div className="output-header">
            <h3>AI Response</h3>

            <div className="output-actions">
              <button className="copy-btn" onClick={copyResult}>
                📋 Copy
              </button>

              <button className="clear-btn" onClick={clearResult}>
                Clear
              </button>
            </div>
          </div>

          <div className="output-content">
            {loading && <p className="typing">Thinking...</p>}
            {error && <p className="error">{error}</p>}
            {result && <pre>{result}</pre>}
          </div>
        </div>

      </div>
    </div>
  );
}

export default HomePage;