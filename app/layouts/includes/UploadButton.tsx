"use client";
import { useUser } from "@/app/context/user";
import { useGeneralStore } from "@/app/stores/general";
import { useRouter } from "next/navigation";
import { AiOutlinePlus } from "react-icons/ai";
import { HiOutlinePlusSmall } from "react-icons/hi2";

const UploadButton = () => {
  const router = useRouter();
  const userContext = useUser();
  let { setIsLoginOpen, setIsEditProfileOpen } = useGeneralStore();
  const goTo = () => {
    if (!userContext?.user) return setIsLoginOpen(true);
    router.push("/upload");
  };
  return (
    <div className="flex-1">
      <button
        onClick={() => goTo()}
        className="items-center border rounded-sm py-[6px] hover:bg-gray-100 pl-1.5 hidden sm:flex"
      >
        <AiOutlinePlus color="#000000" size="22" />
        <span className="px-2 font-medium text-[15px]">Upload</span>
      </button>
      <div
        className="w-full flex flex-col items-center justify-center"
        onClick={() => goTo()}
      >
        <div className="bg-white text-black px-1 rounded-md sm:hidden">
          <HiOutlinePlusSmall size={22} />
        </div>
      </div>
    </div>
  );
};

export default UploadButton;
