import { FaUser } from "react-icons/fa6";
import UPIFetch from "../profileUtils/UPIFetch";
import React from "react";
import { IoQrCodeOutline } from "react-icons/io5";

const UpiBase = ({ user }: { user: any }) => {
  return (
    <div>
      {user.upi ? (
        <div>
          <button className="p-2 mt-2 border-[1px] rounded-xl flex items-center text-xs gap-2 justify-center flex-row">
            <IoQrCodeOutline className="text-sm" /> {user.upi}
          </button>
        </div>
      ) : (
        <div>
          <UPIFetch />
        </div>
      )}
    </div>
  );
};

export default UpiBase;
