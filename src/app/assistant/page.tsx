import App from "@/components/assistant/App";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "RAAHI AI Concierge | Grounded Travel & Local Heritage Assistant",
  description:
    "Real-time Google Maps and Google Search grounded AI assistant for exploring India, curated heritage itineraries, authentic cuisine, and live local guides.",
};

export default function AssistantPage() {
  return <App />;
}
