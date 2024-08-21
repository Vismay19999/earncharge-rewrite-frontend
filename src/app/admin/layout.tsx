import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div className=" flex flex-row ">
            <div className="">

            </div>
            <div className="w-full  mt-14 xl:mt-2 p-5 overflow-hidden">{children}</div>
            <ToastContainer />
        </div>
    );
};

export default AdminLayout;