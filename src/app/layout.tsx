import "./globals.css";
import { Roboto_Slab } from "next/font/google";

const font = Roboto_Slab({ subsets: ["latin"], weight: ["400", "700"] });

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
