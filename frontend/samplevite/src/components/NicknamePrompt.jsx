import { useState } from "react";

export default function NicknamePrompt({ onSet }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) {
      setError("Nickname cannot be empty");
    } else if (trimmed.length > 64) {
      setError("Nickname too long (max 64 chars)");
    } else {
      setError("");
      onSet(trimmed);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="mb-3 text-xl font-semibold text-white">Choose a Nickname</h2>
        <input
          type="text"
          className="w-full rounded-lg border-2 border-gray-600 bg-gray-800 p-3 mb-3 text-white"
          placeholder="Enter nickname"
          value={input}
          autoFocus
          onChange={e => setInput(e.target.value)}
          maxLength={64}
        />
        {error && <div className="mb-2 text-red-400 text-sm">{error}</div>}
        <button
          type="submit"
          className="w-full rounded-lg bg-red-600 py-2 font-semibold text-white hover:bg-red-700"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
