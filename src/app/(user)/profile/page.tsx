"use client";
import { useUser } from "@/actions/UserContext/UserContext";
import IndexProfile from "@/components/profile/IndexProfile";
import React from "react";

const Page = () => {
  return (
    <>
      <div className="m-auto max-w-[1280px] p-10">
        <IndexProfile />
      </div>
    </>
  );
};

export default Page;
