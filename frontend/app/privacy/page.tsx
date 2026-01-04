import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | StudyIntel",
  description:
    "Learn how StudyIntel collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0a0a]/80 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-semibold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            StudyIntel
          </Link>
          <Link
            href="/signup"
            className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Back to Sign Up
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Title Section */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Your Privacy Matters
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-br from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-zinc-400 text-lg">Last updated: January 4, 2026</p>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Introduction */}
          <section className="group">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900/50 to-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
              <h2 className="text-2xl font-semibold mb-4 text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 text-sm">
                  1
                </span>
                Introduction
              </h2>
              <p className="text-zinc-300 leading-relaxed">
                Welcome to StudyIntel. We respect your privacy and are committed
                to protecting your personal data. This privacy policy explains
                how we collect, use, disclose, and safeguard your information
                when you use our study analytics platform designed for UNSW
                students.
              </p>
            </div>
          </section>

          {/* Information We Collect */}
          <section>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900/50 to-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
              <h2 className="text-2xl font-semibold mb-4 text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-400 text-sm">
                  2
                </span>
                Information We Collect
              </h2>
              <div className="space-y-4 text-zinc-300">
                <p className="leading-relaxed">
                  We collect information that you provide directly to us,
                  including:
                </p>
                <ul className="space-y-3 ml-4">
                  {[
                    "Account information (name, email address, password)",
                    "Course enrollment data and academic preferences",
                    "Study session data (duration, timestamps, courses studied)",
                    "User-generated content and course topics",
                    "Usage data and analytics preferences",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900/50 to-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
              <h2 className="text-2xl font-semibold mb-4 text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm">
                  3
                </span>
                How We Use Your Information
              </h2>
              <div className="space-y-4 text-zinc-300">
                <p className="leading-relaxed">
                  We use the collected information to:
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    {
                      icon: "📊",
                      text: "Provide personalized study analytics",
                    },
                    { icon: "🎯", text: "Generate AI-driven insights" },
                    { icon: "📈", text: "Track your academic progress" },
                    { icon: "🔔", text: "Send relevant notifications" },
                    { icon: "🛡️", text: "Maintain platform security" },
                    { icon: "✨", text: "Improve our services" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-xl bg-zinc-800/30 border border-zinc-700/30"
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900/50 to-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
              <h2 className="text-2xl font-semibold mb-4 text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 text-sm">
                  4
                </span>
                Data Security
              </h2>
              <p className="text-zinc-300 leading-relaxed">
                We implement industry-standard security measures to protect your
                personal information. Your data is encrypted in transit using
                TLS and at rest using AES-256 encryption. We regularly audit our
                security practices and limit access to your personal data to
                authorized personnel only.
              </p>
            </div>
          </section>

          {/* Data Sharing */}
          <section>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900/50 to-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
              <h2 className="text-2xl font-semibold mb-4 text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-400 text-sm">
                  5
                </span>
                Data Sharing
              </h2>
              <p className="text-zinc-300 leading-relaxed mb-4">
                We do not sell your personal information. We may share your data
                only in the following circumstances:
              </p>
              <ul className="space-y-3 text-zinc-300 ml-4">
                {[
                  "With your explicit consent",
                  "To comply with legal obligations",
                  "With service providers who assist in platform operations",
                  "In anonymized, aggregated form for research purposes",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900/50 to-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
              <h2 className="text-2xl font-semibold mb-4 text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-sm">
                  6
                </span>
                Your Rights
              </h2>
              <p className="text-zinc-300 leading-relaxed mb-4">
                You have the right to:
              </p>
              <div className="grid gap-3">
                {[
                  {
                    title: "Access",
                    desc: "Request a copy of your personal data",
                  },
                  {
                    title: "Rectification",
                    desc: "Correct inaccurate or incomplete data",
                  },
                  {
                    title: "Erasure",
                    desc: "Request deletion of your personal data",
                  },
                  {
                    title: "Portability",
                    desc: "Export your data in a machine-readable format",
                  },
                  {
                    title: "Objection",
                    desc: "Object to certain types of data processing",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-xl bg-zinc-800/30 border border-zinc-700/30"
                  >
                    <span className="text-cyan-400 font-medium min-w-[100px]">
                      {item.title}
                    </span>
                    <span className="text-zinc-400 text-sm">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact */}
          <section>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-violet-500/10 border border-blue-500/20 hover:border-blue-500/30 transition-colors">
              <h2 className="text-2xl font-semibold mb-4 text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 text-sm">
                  7
                </span>
                Contact Us
              </h2>
              <p className="text-zinc-300 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our data
                practices, please contact us:
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:privacy@studyintel.com"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-zinc-300 hover:text-white hover:border-zinc-600 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  privacy@studyintel.com
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Links */}
        <div className="mt-16 pt-8 border-t border-zinc-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm">
            © 2026 StudyIntel. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/tos"
              className="text-zinc-400 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/"
              className="text-zinc-400 hover:text-white text-sm transition-colors"
            >
              Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
