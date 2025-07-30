import { useState } from "react";
import { generateText } from "./api/generateText";
import "./App.css";

function Generate() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt || typeof prompt !== "string" || !prompt.trim()) return;

    setLoading(true);
    setResult({});

    try {
      const response = await generateText(prompt);
      setResult(response);
    } catch (error) {
      setResult({
        generated: "Failed to connect to the server",
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>🎯 AI Career Path Generator</h1>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Example: I want to become a software engineer interested in backend development and AI."
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Generating..." : "Get Career Suggestions"}
      </button>

      {result.generated && (
        <div className={`result-box ${result.error ? "error" : "success"}`}>
          <h2>{result.error ? "Error" : "Career Path Suggestions"}</h2>

          {!result.error ? (
            result.generated
              .split(/Path \d:/) // Split each path from AI response
              .filter((entry) => entry.trim())
              .map((entry, index) => {
                const title =
                  entry.match(/1\)\s*(.*?)\s*2\)/)?.[1]?.trim() ||
                  `Career ${index + 1}`;
                const desc =
                  entry.match(/2\)\s*(.*?)\s*3\)/)?.[1]?.trim() || "";
                const skills =
                  entry.match(/3\)\s*Key Skills:\s*(.*?)\s*4\)/)?.[1]?.trim() ||
                  "";
                const salary =
                  entry.match(/4\)\s*Salary Range:\s*(.*)/)?.[1]?.trim() || "";

                return (
                  <div key={index} className="career-entry">
                    <h3 className="career-heading">{title}</h3>
                    <p>
                      <strong>Description:</strong> {desc}
                    </p>
                    <p>
                      <strong>Key Skills:</strong> {skills}
                    </p>
                    <p>
                      <strong>Salary Range:</strong> {salary}
                    </p>
                  </div>
                );
              })
          ) : (
            <p>{result.generated}</p>
          )}

          {!result.success && !result.error && (
            <p className="help-text">
              Tip: Describe your skills or interests for better results.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Generate;
