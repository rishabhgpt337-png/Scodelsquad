import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Raahi — Travel Smarter, Explore Deeper",
  description:
    "Raahi is your AI-powered travel companion for India. Personalized itineraries, local experiences, and real-time guidance — all in one place.",
  keywords: ["travel india", "itinerary planner", "AI travel", "local experiences", "SIH"],
  openGraph: {
    title: "Raahi — Travel Smarter, Explore Deeper",
    description: "Your AI travel companion for India.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
