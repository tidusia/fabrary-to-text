"use client";

import { useState } from "react";
import csvToCards from "../utils/csv-to-cards";

export default function Home() {
  const [text, setText] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.files?.[0];
    if (input) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const text = e.target?.result;
        setText(String(text || ""));
      };
      reader.readAsText(input);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <input
        type="file"
        name="file"
        id="file"
        onChange={handleInputChange}
        accept=".csv"
      />

      <pre>
        <code>{JSON.stringify(csvToCards(text), null, 2)}</code>
      </pre>
    </main>
  );
}
