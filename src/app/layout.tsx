import classNames from "classnames";
import "./globals.css";
import { Roboto_Slab, IBM_Plex_Mono } from "next/font/google";

const monospace = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--monospace",
});
const body = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font",
});

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
      <body className={classNames(monospace.variable, body.className)}>
        {children}
      </body>
    </html>
  );
}
