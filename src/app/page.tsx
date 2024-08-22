"use client";
import Footer from "@/components/core/Footer/Footer";
import Header from "@/components/core/Header/Header";
import MobileSidebar from "@/components/core/Header/MobileSidebar";

export default function Home() {
  return (
    <>
      <div>
        <div className="hidden lg:block">
          <Header />
        </div>
        <div className="lg:hidden">
          <MobileSidebar />
        </div>
      </div>
      <Footer/>
    </>
  );
}
