import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";


const inter = IBM_Plex_Sans(
  {
    subsets: ["latin"],
    weight: ['400','500', '600','700'],
    variable: '--font-ibm-plex'
  }

);

export const metadata: Metadata = {
  title: "ImgeinAI",
    
  description: "Ai Power Image Genrator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
