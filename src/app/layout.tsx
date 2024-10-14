import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/actions/UserContext/UserContext";
import Header from "@/components/core/Header/Header";
import Footer from "@/components/core/Footer/Footer";
import Translatecomponent from "@/components/translate/translatecomponent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EarnCharge",
  description: "Recharge App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <div>
            <Header />
          </div>
          {children}
          <div>
            <Footer />
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
