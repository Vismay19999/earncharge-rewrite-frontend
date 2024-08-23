"use client";
import { useUser } from "@/actions/UserContext/UserContext";
import Recharge from "@/components/core/Home/recharge";
import IndexRecharge from "@/components/recharge/IndexRecharge";

export default function Home() {
  const { user } = useUser()

  return (
    <div>
      <div>
        <Recharge />
      </div>
      {user && (
        <div>
          <IndexRecharge />
        </div>
      )}
    </div>
  );
}
