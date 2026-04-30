"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="py-2 px-2">
      <h1 className="text-2xl font-bold italic underline">
        Holeey's encrypted file storage
      </h1>

      <Link href="/sign-up">
        <button className="mt-4 px-4 py-2 
        bg-blue-500 text-white rounded 
        hover:bg-blue-600 cursor-pointer transition  duration-300  ease-in-out transform 
        hover:-translate-y-1 hover:scale-110  ">
          Go to signup
        </button>
      </Link>
    </div>
  );
}
