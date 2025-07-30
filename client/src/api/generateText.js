export const generateText = async (prompt) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("API Error Details:", data);
      throw new Error(data.error || "Failed to generate career suggestions");
    }

    return {
      generated: data.generated || "No career suggestions generated",
      success: true,
    };
  } catch (err) {
    console.error("Full Error:", err);
    return {
      generated: `Error: ${err.message}`,
      success: false,
      error: true,
    };
  }
};
