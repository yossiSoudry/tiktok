"use client";
import { useUser } from "@/app/context/user";
import { useGeneralStore } from "@/app/stores/general";
import { BsPencil } from "react-icons/bs";

interface ProfileButtonProps {
  id: string;
}

const ProfileButton = ({ id }: ProfileButtonProps) => {
  const userContext = useUser();
  let { isEditProfileOpen, setIsEditProfileOpen } = useGeneralStore();
  
  return (
    <div>
      { userContext  ? (
        userContext?.user?.id !== id ? (
          <button className="flex item-center rounded-md py-2 px-6 mt-3 text-[15px] text-white font-semibold bg-red-500">
            Follow
          </button>
        ) : (
          <button
            onClick={() =>
              setIsEditProfileOpen((isEditProfileOpen = !isEditProfileOpen))
            }
            className="flex max-sm:bg-slate-200/70 item-center rounded-md py-2 px-4 mt-3 text-[15px] sm:border hover:bg-gray-100"
          >
            <BsPencil className="mt-0.5 mr-1 max-sm:hidden" size="18" />
            <span>Edit profile</span>
          </button>
        )
      ) : (
        <div className="bg-slate-200 animate-pulse w-10 py-5 px-12 rounded-md mt-3"/>
      )}
    </div>
  );
};

export default ProfileButton;
