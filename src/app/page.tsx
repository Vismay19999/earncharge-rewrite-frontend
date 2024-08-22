"use client";
import { useUser } from "@/actions/UserContext/UserContext";
import IndexRecharge from "@/components/recharge/IndexRecharge";

export default function Home() {
  const { user } = useUser()

  return (
    <div>
      {user &&
        <div>
          <IndexRecharge />
        </div>
      }
    </div>
  );
}
