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
  title: "Raahi | Ministry of Tourism - Smart India Hackathon",
  description:
    "India's official AI-powered heritage and travel ecosystem. Verified master itineraries, local artisan networks, and connected digital tourist passes.",
  keywords: ["ministry of tourism", "smart india hackathon", "travel india", "itinerary planner", "AI travel", "local experiences"],
  openGraph: {
    title: "Raahi | Ministry of Tourism India",
    description: "India's official AI-powered heritage and travel ecosystem.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="antialiased font-sans bg-slate-950 text-white">{children}</body>
    </html>
  );
}
