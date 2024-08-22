"use client";
import Footer from "@/components/core/Footer/Footer";
import Header from "@/components/core/Header/Header";
import MobileSidebar from "@/components/core/Header/MobileSidebar";
import Hero from "@/components/core/Hero/Hero";

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
      <Hero />
      <Footer/>
    </>
  );
}
