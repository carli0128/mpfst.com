// pages/index.tsx (Next.js Pages Router)
import React from "react";
import Script from "next/script";

export default function HomePage() {
  return (
    <>
      {/* Load an external script the Next.js way */}
      <Script src="/some-script.js" strategy="afterInteractive" />

      <main className="p-6 text-white bg-black min-h-screen">
        <h1 className="text-4xl font-bold">Hello from MPFST</h1>
        <p className="mt-4 text-gray-300">This is a test page.</p>
      </main>
    </>
  );
}