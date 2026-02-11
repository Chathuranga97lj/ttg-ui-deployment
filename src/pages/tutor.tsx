import React from "react";
import Link from "next/link";

export default function Tutor() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-semibold mb-6">Become a Tutor</h1>
      <p className="text-gray-700 mb-4">
        Join our community of expert tutors and help learners worldwide.
      </p>
      <p className="text-gray-700 mb-6">
        Sign up to create your tutor profile and start teaching.
      </p>

      <Link href="/" className="text-blue-600 hover:underline">
        ← Back to home
      </Link>
    </main>
  );
}
