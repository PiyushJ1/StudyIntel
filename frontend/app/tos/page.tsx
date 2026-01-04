import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | StudyIntel",
  description:
    "Read the terms and conditions for using StudyIntel's study analytics platform.",
};

export default function TermsOfServicePage() {
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
            href="/"
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
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Title Section */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-6">
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
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" x2="8" y1="13" y2="13" />
              <line x1="16" x2="8" y1="17" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            Legal Agreement
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-br from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-zinc-400 text-lg">Last updated: January 4, 2026</p>
        </div>

        {/* Quick Summary */}
        <div className="mb-12 p-6 rounded-2xl bg-gradient-to-br from-blue-500/5 to-violet-500/5 border border-blue-500/10">
          <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-400"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            Quick Summary
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            By using StudyIntel, you agree to use our platform responsibly,
            respect other users, and understand that we provide study analytics
            tools &quot;as is&quot;. We&apos;re here to help you study smarter,
            not to guarantee academic success.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Acceptance of Terms */}
          <section>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900/50 to-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
              <h2 className="text-2xl font-semibold mb-4 text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 text-sm font-mono">
                  §1
                </span>
                Acceptance of Terms
              </h2>
              <p className="text-zinc-300 leading-relaxed">
                By accessing or using StudyIntel (&quot;the Service&quot;), you
                agree to be bound by these Terms of Service. If you do not agree
                to these terms, please do not use our Service. We reserve the
                right to modify these terms at any time, and your continued use
                of the Service constitutes acceptance of any changes.
              </p>
            </div>
          </section>

          {/* Description of Service */}
          <section>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900/50 to-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
              <h2 className="text-2xl font-semibold mb-4 text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-400 text-sm font-mono">
                  §2
                </span>
                Description of Service
              </h2>
              <p className="text-zinc-300 leading-relaxed mb-4">
                StudyIntel is a study analytics platform designed primarily for
                UNSW students that provides:
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Study session tracking and logging",
                  "Performance analytics and visualization",
                  "AI-driven study insights",
                  "Course progress monitoring",
                  "Personalized recommendations",
                  "Academic goal setting tools",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-xl bg-zinc-800/30 border border-zinc-700/30"
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
                      className="text-violet-400 flex-shrink-0"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-sm text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* User Accounts */}
          <section>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900/50 to-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
              <h2 className="text-2xl font-semibold mb-4 text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm font-mono">
                  §3
                </span>
                User Accounts
              </h2>
              <div className="space-y-4 text-zinc-300">
                <p className="leading-relaxed">
                  When creating an account, you agree to:
                </p>
                <ul className="space-y-3 ml-4">
                  {[
                    "Provide accurate and complete registration information",
                    "Maintain the security of your account credentials",
                    "Notify us immediately of any unauthorized access",
                    "Accept responsibility for all activities under your account",
                    "Not share your account with others",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Acceptable Use */}
          <section>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900/50 to-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
              <h2 className="text-2xl font-semibold mb-4 text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 text-sm font-mono">
                  §4
                </span>
                Acceptable Use
              </h2>
              <p className="text-zinc-300 leading-relaxed mb-4">
                You agree not to use the Service to:
              </p>
              <div className="grid gap-2">
                {[
                  "Violate any applicable laws or regulations",
                  "Infringe on intellectual property rights",
                  "Upload malicious code or attempt to hack the platform",
                  "Harass, abuse, or harm other users",
                  "Misrepresent your identity or affiliation",
                  "Use automated systems to access the Service without permission",
                  "Attempt to circumvent security measures",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-800/30 transition-colors"
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
                      className="text-rose-400 flex-shrink-0"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="m15 9-6 6" />
                      <path d="m9 9 6 6" />
                    </svg>
                    <span className="text-zinc-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900/50 to-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
              <h2 className="text-2xl font-semibold mb-4 text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-sm font-mono">
                  §5
                </span>
                Intellectual Property
              </h2>
              <p className="text-zinc-300 leading-relaxed">
                All content, features, and functionality of StudyIntel —
                including but not limited to text, graphics, logos, icons,
                images, audio clips, data compilations, and software — are the
                exclusive property of StudyIntel and are protected by
                international copyright, trademark, and other intellectual
                property laws. You retain ownership of your personal study data.
              </p>
            </div>
          </section>

          {/* Disclaimer */}
          <section>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-500/5 to-orange-500/5 border border-rose-500/20 hover:border-rose-500/30 transition-colors">
              <h2 className="text-2xl font-semibold mb-4 text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-400 text-sm font-mono">
                  §6
                </span>
                Disclaimer of Warranties
              </h2>
              <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50 mb-4">
                <p className="text-zinc-300 leading-relaxed text-sm uppercase tracking-wide">
                  The Service is provided &quot;as is&quot; and &quot;as
                  available&quot; without warranties of any kind, either express
                  or implied.
                </p>
              </div>
              <p className="text-zinc-400 leading-relaxed text-sm">
                StudyIntel does not guarantee that the Service will meet your
                specific requirements, that the Service will be uninterrupted or
                error-free, or that any study insights or recommendations will
                result in improved academic performance.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900/50 to-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
              <h2 className="text-2xl font-semibold mb-4 text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400 text-sm font-mono">
                  §7
                </span>
                Limitation of Liability
              </h2>
              <p className="text-zinc-300 leading-relaxed">
                To the fullest extent permitted by law, StudyIntel shall not be
                liable for any indirect, incidental, special, consequential, or
                punitive damages, including but not limited to loss of profits,
                data, or other intangible losses, resulting from your use or
                inability to use the Service.
              </p>
            </div>
          </section>

          {/* Termination */}
          <section>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900/50 to-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
              <h2 className="text-2xl font-semibold mb-4 text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 text-sm font-mono">
                  §8
                </span>
                Termination
              </h2>
              <p className="text-zinc-300 leading-relaxed">
                We reserve the right to suspend or terminate your account and
                access to the Service at our sole discretion, without notice,
                for conduct that we believe violates these Terms or is harmful
                to other users, us, or third parties, or for any other reason.
                You may also terminate your account at any time through your
                account settings.
              </p>
            </div>
          </section>

          {/* Governing Law */}
          <section>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900/50 to-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
              <h2 className="text-2xl font-semibold mb-4 text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-sm font-mono">
                  §9
                </span>
                Governing Law
              </h2>
              <p className="text-zinc-300 leading-relaxed">
                These Terms shall be governed by and construed in accordance
                with the laws of New South Wales, Australia, without regard to
                its conflict of law provisions. Any disputes arising from these
                Terms or your use of the Service shall be subject to the
                exclusive jurisdiction of the courts of New South Wales.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-violet-500/10 border border-blue-500/20 hover:border-blue-500/30 transition-colors">
              <h2 className="text-2xl font-semibold mb-4 text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 text-sm font-mono">
                  §10
                </span>
                Contact Information
              </h2>
              <p className="text-zinc-300 leading-relaxed mb-4">
                For any questions regarding these Terms of Service, please reach
                out to us:
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:legal@studyintel.com"
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
                  legal@studyintel.com
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
              href="/privacy"
              className="text-zinc-400 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
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
