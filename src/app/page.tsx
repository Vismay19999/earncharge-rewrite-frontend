"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import MobileSidebar from "@/components/Header/MobileSidebar";

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
