import "./globals.css";
import { PT_Serif } from "next/font/google";

const font = PT_Serif({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "spencerschack.com",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
