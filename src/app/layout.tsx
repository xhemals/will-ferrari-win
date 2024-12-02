import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Will Ferrari Win The Constructors Championship?",
  description:
    "There is still a chance that Ferrari can Win the Constructors Championship. And Leclerc takes P2 in the Drivers Championship.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
