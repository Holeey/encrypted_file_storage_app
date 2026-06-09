"use client";

import React, { useState } from "react";

export default function UploadModal() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file) return setStatus("Please select a file first");
    setLoading(true);
    setStatus(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/files/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Upload failed");

      setStatus(`Uploaded: ${data.filename} (${data.size} bytes)`);
      setFile(null);
      (document.getElementById("file-input") as HTMLInputElement | null)?.value &&
        ((document.getElementById("file-input") as HTMLInputElement).value = "");
    } catch (err: any) {
      setStatus(err.message || "Upload error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} 
    className="space-y-2 p-4 
    border rounded
     bg-gray-800
        height-50%
        width-50%
        transform-translate-x-1/2 transform-translate-y-1/2
        ">
      <div className="bg-red-500 border-solid border-2 border-white rounded p-2">
        <input
          id="file-input"
          type="file"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        />
      </div>

      <div className="flex items-center justify-center">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit" disabled={loading || !file}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {status && <div aria-live="polite">{status}</div>}
    </form>
  );
}