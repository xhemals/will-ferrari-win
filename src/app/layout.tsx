import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Will Ferrari Win The Constructors Championship?",
  description:
    "There is still a chance that Ferrari can Win the Constructors Championship. Leclerc still has a reasonable chance of securing second place in the Drivers Championship. The gap between him and Lando Norris is only 8 points. Carlos Sainz can still mathematically secure fourth place in the Drivers Championship if he outscores Pisatri by 19 points.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <main>{children}</main>
        <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
        <Analytics />
      </body>
    </html>
  );
}
