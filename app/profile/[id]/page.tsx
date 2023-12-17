// "use client";

import PostUser from "@/app/components/profile/PostUser";
import MainLayout from "@/app/layouts/MainLayout";
import ClientOnly from "@/app/components/ClientOnly";
import { ProfilePageTypes, User } from "@/app/types";
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";
import useGetPostsByUser from "@/actions/getPostsByUserId";
import getProfileByUserId from "@/actions/getProfileByUserId";
import getCurrentUser from "@/actions/getCurrentUser";
import ProfileButton from "../_components/ProfileButton";
import { PiGridNineFill, PiRepeat } from "react-icons/pi";
import { TbHeartSearch } from "react-icons/tb";
import { RiArrowDownSFill } from "react-icons/ri";
import { HiArrowSmallLeft } from "react-icons/hi2";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Profile({ params }: ProfilePageTypes) {
  // const currentUser = await getCurrentUser();
  const result = await useGetPostsByUser(params?.id);
  const profile = await getProfileByUserId(params?.id);


  return (
    <>
      <MainLayout>
        <div className="max-sm:min-h-screen sm:pt-[90px] pt-4 sm:ml-[90px] lg:ml-[218px] lg:pr-0 sm:w-[calc(100%-90px)] sm:px-0.5 sm:pr-3 max-w-[1800px] mx-auto flex flex-col max-sm:items-center">
          <div className="flex justify-between w-full px-4 items-center mb-2">
            <Link href="/" className="sm:hidden">
              <HiArrowSmallLeft size={28} />
            </Link>
            <p className="text-[18px] sm:text-[20px] font-semibold sm:font-bold truncate sm:hidden mb-2">
              {profile?.name}
            </p>
            <div></div>
          </div>
          <div className="sm:flex w-[120px] sm:w-[calc(100vw-230px)]">
            {profile ? (
              <img
                className="w-[120px] min-w-[120px] rounded-full"
                src={useCreateBucketUrl(profile?.image)}
              />
            ) : (
              <div className="min-w-[120px] h-[120px] bg-gray-200 rounded-full" />
            )}

            <div className="sm:ml-5 w-full">
              {(profile as User)?.name ? (
                <div>
                  <p className="text-[30px] font-bold truncate max-sm:hidden">
                    {profile?.name}
                  </p>
                  <p className=" sm:text-[18px] truncate w-full max-sm:text-center lowercase max-sm:mt-1">
                    @{profile?.name.replace(/\s+/g, "_")}
                  </p>
                </div>
              ) : (
                <div className="h-[60px]" />
              )}
              <div className="hidden sm:block">
                <ProfileButton id={profile.user_id} />
              </div>
            </div>
          </div>

          <div className="flex items-center pt-4">
            <div className="mr-4 flex max-sm:flex-col items-center">
              <span className="font-bold">10K</span>
              <span className="text-gray-500 font-extralight text-sm sm:text-[15px] pl-1.5">
                Following
              </span>
            </div>
            <div className="mr-4 flex max-sm:flex-col items-center">
              <span className="font-bold">44K</span>
              <span className="text-gray-500 font-extralight text-sm sm:text-[15px] pl-1.5">
                Followers
              </span>
            </div>
            <div className="mr-4 flex max-sm:flex-col items-center">
              <span className="font-bold">127.2K</span>
              <span className="text-gray-500 font-extralight text-sm sm:text-[15px] pl-1.5">
                Likes
              </span>
            </div>
          </div>

          <p className="pt-4 mr-4 text-gray-500 font-light text-[15px] pl-1.5 max-w-[500px] hidden sm:block">
            {profile?.bio}
          </p>

          <div className="flex gap-1 sm:hidden">
            <ProfileButton id={profile.user_id} />
            <button className="flex item-center rounded-md py-2 px-4 mt-3 text-[15px] bg-slate-200/70">
              Message
            </button>
            <button className="flex item-center rounded-md py-2 px-1.5 mt-3 text-[15px] bg-slate-200/70">
              <RiArrowDownSFill size={20} />
            </button>
          </div>

          <ul className="w-full flex items-center pt-4 border-b">
            <li className="w-1/3 sm:w-60 text-center py-2 text-[17px] font-semibold border-b-2 border-b-black">
              <div className="max-sm:hidden">Videos</div>
              <div className="sm:hidden w-fit rotate-90 mx-auto">
                <PiGridNineFill size={24} />
              </div>
            </li>
            <li className="w-1/3 sm:w-60 text-center py-2 text-[17px] font-semibold">
              <div className="max-sm:hidden">Liked</div>
              <div className="sm:hidden w-fit rotate-90 mx-auto">
                <PiRepeat size={24} />
              </div>
            </li>
            <li className="w-1/3 sm:w-60 text-center py-2 text-[17px] font-semibold">
              <div className="max-sm:hidden"></div>
              <div className="sm:hidden w-fit mx-auto">
                <TbHeartSearch size={24} />
              </div>
            </li>
          </ul>

          <div className="sm:mt-4 mt-0.5 grid 2xl:grid-cols-7 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-3 gap-0.5 sm:gap-3">
            {result?.map((post, index) => (
              <PostUser key={index} post={post} />
            ))}
          </div>

          <div className="pb-20" />
        </div>
      </MainLayout>
    </>
  );
}
