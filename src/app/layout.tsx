import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/actions/UserContext/UserContext";
import Header from "@/components/core/Header/Header";
import Translatecomponent from "@/components/translate/translatecomponent";
import BottomNavigation from "@/components/ui/navigation";
import Footer from "@/components/core/Footer/Footer";
import { MpinProvider } from "@/actions/MpinContext/MpinContext";

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
          <MpinProvider>
          <div>
            <Header />
          </div>
          {children}
          <div>
          </div>
          <BottomNavigation />
          <div className="hidden md:block">
          <Footer />
          </div>

          </MpinProvider>
        </UserProvider>
      </body>
    </html>
  );
}
