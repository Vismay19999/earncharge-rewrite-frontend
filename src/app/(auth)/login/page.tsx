"use client";
import { useUser } from "@/actions/UserContext/UserContext";
import LoginForm from "@/components/auth/LoginForm";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const { user } = useUser();
  const router = useRouter();

  React.useEffect(() => {
    if (user) {
      router.push("/profile");
    }
  }, [user, router]);

  return (
    <div className="h-screen w-full items-center flex justify-center">
      <LoginForm />
    </div>
  );
};

export default Page;
