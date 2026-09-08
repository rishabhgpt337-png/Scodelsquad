import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { DestinationProvider } from "@/context/DestinationContext";
import AssistantApp from "@/components/assistant/App";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Raahi | Ministry of Tourism Travel Platform",
  description:
    "India's official AI-powered heritage and travel ecosystem. Verified master itineraries, local artisan networks, and connected digital tourist passes.",
  keywords: ["ministry of tourism", "travel india", "itinerary planner", "AI travel", "local experiences"],
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
    <html lang="en" className={`${dmSans.variable} ${playfairDisplay.variable}`}>
      <body className="antialiased font-sans bg-[#0D0C0A] text-[#F3EDE3]">
        <AuthProvider>
          <DestinationProvider>
            {children}
            <AssistantApp />
          </DestinationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
