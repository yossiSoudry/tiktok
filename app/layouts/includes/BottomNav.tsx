'use client'
import { useGeneralStore } from "@/app/stores/general";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { GoPeople } from "react-icons/go";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { LiaInboxSolid } from "react-icons/lia";
import { RiUserLine } from "react-icons/ri";
import UploadButton from "./UploadButton";

const BottomNav = () => {
    let { setIsLoginOpen, setIsEditProfileOpen } = useGeneralStore();
    const goTo = () => {
        setIsLoginOpen(true);
        redirect("/upload");
      };
    return (
        <div className="z-50 flex justify-between items-center w-full sticky bottom-0 bg-dark-2 px-3 py-1 sm:hidden bg-black text-white">
        <Link href="/" className="w-1/5 flex flex-col items-center justify-center">
        <div><AiFillHome size={22} /></div>
        <div className="text-xs">Home</div>
        </Link>
        <div className="w-1/5 flex flex-col items-center justify-center">
        <div><GoPeople  size={22} /></div>
        <div className="text-xs">Friends</div>
        </div>
        <UploadButton />
        <div className="w-1/5 flex flex-col items-center justify-center">
        <div><LiaInboxSolid  size={22} /></div>
        <div className="text-xs">Inbox</div>
        </div>
        <div className="w-1/5 flex flex-col items-center justify-center">
        <div><RiUserLine size={22} /></div>
        <div className="text-xs">Profile</div>
        </div>
      </div>
    );
}

export default BottomNav;