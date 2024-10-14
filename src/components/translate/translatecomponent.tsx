"use client";
import GoogleTranslate from "@/components/GoogleTranslate";
import React from "react";

const Translatecomponent = () => {
  return (
    <div className="container mx-auto flex flex-col w-[190px] h-[60px] bottom-[10px] fixed right-[10px] overflow-hidden z-10">
      <GoogleTranslate />
    </div>
  );
};

export default Translatecomponent;
