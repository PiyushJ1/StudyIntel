import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
	weight: ["400", "500", "600"]
});

export const metadata: Metadata = {
	title: "TimeLyze | AI-powered study optimization",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={inter.variable}>
			<body className="antialiased font-sans">
				{children}
			</body>
		</html>
	);
}
