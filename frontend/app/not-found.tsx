import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* 404 Number */}
        <h1 className="text-[8rem] md:text-[10rem] font-bold leading-none bg-gradient-to-br from-blue-500 via-violet-500 to-purple-600 bg-clip-text text-transparent select-none">
          404
        </h1>

        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-semibold text-white mt-2 mb-3">
          Page not found
        </h2>
        <p className="text-zinc-400 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Back Home Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium hover:from-blue-500 hover:to-violet-500 transition-all duration-200 shadow-lg shadow-violet-500/20"
        >
          
          Back to Home
        </Link>
      </div>
    </div>
  );
}
