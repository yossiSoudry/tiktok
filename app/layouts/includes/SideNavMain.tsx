"use client";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ClientOnly from "@/app/components/ClientOnly";
import MenuItem from "./MenuItem";
import MenuItemFollow from "./MenuItemFollow";
import { useUser } from "@/app/context/user";
import { useGeneralStore } from "@/app/stores/general";
import { AiFillHome } from "react-icons/ai";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { GoPeople } from "react-icons/go";
import { LiaInboxSolid } from "react-icons/lia";
import { RiUserLine } from "react-icons/ri";
import BottomNav from "./BottomNav";

export default function SideNavMain() {
  let { setRandomUsers, randomUsers } = useGeneralStore();

  const contextUser = useUser();
  const pathname = usePathname();

  useEffect(() => {
    setRandomUsers();
  }, []);
  return (
    <>
      <div
        id="SideNavMain"
        className={`fixed z-20 bg-white pt-[70px] h-full lg:border-r-0 border-r w-[75px] overflow-auto max-sm:hidden ${
          pathname === "/" ? "lg:w-[310px]" : "lg:w-[220px]"
        }`}
      >
        <div className="lg:w-full w-[55px] mx-auto">
          <Link href="/">
            <MenuItem
              iconString="For You"
              colorString={pathname == "/" ? "#F02C56" : ""}
              sizeString="25"
            />
          </Link>
          <MenuItem
            iconString="Following"
            colorString="#000000"
            sizeString="25"
          />
          <MenuItem iconString="LIVE" colorString="#000000" sizeString="25" />

          <div className="border-b lg:ml-2 mt-2" />
          <h3 className="lg:block hidden text-xs text-gray-600 font-semibold pt-4 pb-2 px-2">
            Suggested accounts
          </h3>

          <div className="lg:hidden block pt-3" />
          <ClientOnly>
            <div className="cursor-pointer">
              {randomUsers?.map((user, index) => (
                <MenuItemFollow key={index} user={user} />
              ))}
            </div>
          </ClientOnly>

          <button className="lg:block hidden text-[#F02C56] pt-1.5 pl-2 text-[13px]">
            See all
          </button>

          {true ? (
            <div>
              <div className="border-b lg:ml-2 mt-2" />
              <h3 className="lg:block hidden text-xs text-gray-600 font-semibold pt-4 pb-2 px-2">
                Following accounts
              </h3>

              <div className="lg:hidden block pt-3" />
              <ClientOnly>
                <div className="cursor-pointer">
                  {randomUsers?.map((user, index) => (
                    <MenuItemFollow key={index} user={user} />
                  ))}
                </div>
              </ClientOnly>

              <button className="lg:block hidden text-[#F02C56] pt-1.5 pl-2 text-[13px]">
                See more
              </button>
            </div>
          ) : null}
          <div className="lg:block hidden border-b lg:ml-2 mt-2" />

          <div className="lg:block hidden text-[11px] text-gray-500">
            <p className="pt-4 px-2">
              About Newsroom TikTok Shop Contact Careers ByteDance
            </p>
            <p className="pt-4 px-2">
              TikTok for Good Advertise Developers Transparency TikTok Rewards
              TikTok Browse TikTok Embeds
            </p>
            <p className="pt-4 px-2">
              Help Safety Terms Privacy Creator Portal Community Guidelines
            </p>
            <p className="pt-4 px-2">© 2023 TikTok</p>
          </div>

          <div className="pb-14"></div>
        </div>
      </div>
      <BottomNav />
    </>
  );
}
