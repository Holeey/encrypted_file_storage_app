"use client";

import { useRef, useState } from "react";
import type { ChangeEvent, SyntheticEvent } from "react";
import { uploadFile } from "../../lib/api";

export default function UploadModal() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null);
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file) {
      setLoading(true);
      try {
        await uploadFile({file});
        setStatus(`File "${file.name}" uploaded successfully!`);
      } catch {
        setStatus( `Upload failed for "${file.name}". Please try again.`);
      } finally {
        resetForm();
      }
    }
  };

  const resetForm = () => {
    setFile(null);
    setStatus(null);
    setLoading(false);
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
  };

  return (
    <form onSubmit={handleSubmit} 
    className="
    space-y-2 p-4 border rounded bg-gray-800
    w-1/2
    fixed top-1/2 left-1/2
    -translate-x-1/2 -translate-y-1/2

        ">
      <div className="bg-red-500 border-solid border-2 border-white rounded p-2">
        <input
          ref={fileInputRef}
          id="file-input"
          type="file"
          onChange={handleFileChange}
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