"use client";

import Link from "next/link";
import { AiFillHeart } from "react-icons/ai";
import { BsChatDots, BsChatDotsFill, BsTrash3 } from "react-icons/bs";
import { ImMusic } from "react-icons/im";
import moment from "moment";
import { useEffect, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import ClientOnly from "../ClientOnly";
import { useGeneralStore } from "@/app/stores/general";
import { useRouter } from "next/navigation";
import { CommentsHeaderCompTypes } from "@/app/types";
import { useUser } from "@/app/context/user";
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";
import { useLikeStore } from "@/app/stores/like";
import { useCommentStore } from "@/app/stores/comment";
import useIsLiked from "@/app/hooks/useIsLiked";
import useCreateLike from "@/app/hooks/useCreateLike";
import useDeleteLike from "@/app/hooks/useDeleteLike";
import useDeletePostById from "@/app/hooks/useDeletePostById";
import { PiTagChevronFill } from "react-icons/pi";

export default function CommentsHeader({
  post,
  params,
}: CommentsHeaderCompTypes) {
  let { setLikesByPost, likesByPost } = useLikeStore();
  let { commentsByPost, setCommentsByPost } = useCommentStore();
  let { setIsLoginOpen } = useGeneralStore();

  const contextUser = useUser();
  const router = useRouter();
  const [hasClickedLike, setHasClickedLike] = useState<boolean>(false);
  const [isDeleteing, setIsDeleteing] = useState<boolean>(false);
  const [userLiked, setUserLiked] = useState<boolean>(false);

  useEffect(() => {
    setCommentsByPost(params?.postId);
    setLikesByPost(params?.postId);
  }, [post]);
  useEffect(() => {
    hasUserLikedPost();
  }, [likesByPost]);

  const hasUserLikedPost = () => {
    if (likesByPost.length < 1 || !contextUser?.user?.id) {
      setUserLiked(false);
      return;
    }
    let res = useIsLiked(contextUser.user.id, params.postId, likesByPost);
    setUserLiked(res ? true : false);
  };

  const like = async () => {
    try {
      setHasClickedLike(true);
      await useCreateLike(contextUser?.user?.id || "", params.postId);
      setLikesByPost(params.postId);
      setHasClickedLike(false);
    } catch (error) {
      console.log(error);
      alert(error);
      setHasClickedLike(false);
    }
  };

  const unlike = async (id: string) => {
    try {
      setHasClickedLike(true);
      await useDeleteLike(id);
      setLikesByPost(params.postId);
      setHasClickedLike(false);
    } catch (error) {
      console.log(error);
      alert(error);
      setHasClickedLike(false);
    }
  };

  const likeOrUnlike = () => {
    if (!contextUser?.user) return setIsLoginOpen(true);

    let res = useIsLiked(contextUser.user.id, params.postId, likesByPost);
    if (!res) {
      like();
    } else {
      likesByPost.forEach((like) => {
        if (
          contextUser?.user?.id &&
          contextUser.user.id == like.user_id &&
          like.post_id == params.postId
        ) {
          unlike(like.id);
        }
      });
    }
  };

  const deletePost = async () => {
    let res = confirm("Are you sure you want to delete this post?");
    if (!res) return;

    setIsDeleteing(true);

    try {
      await useDeletePostById(params?.postId, post?.video_url);
      router.push(`/profile/${params.userId}`);
      setIsDeleteing(false);
    } catch (error) {
      console.log(error);
      setIsDeleteing(false);
      alert(error);
    }
  };
  return (
    <div className="px-6">
    <div className="bg-neutral-100/90 p-4 rounded-md">

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href={`/profile/${post?.user_id}`}>
            {post?.profile.image ? (
              <img
                className="rounded-full lg:mx-0 mx-auto"
                width="40"
                src={useCreateBucketUrl(post?.profile.image)}
              />
            ) : (
              <div className="w-[40px] h-[40px] bg-gray-200 rounded-full"></div>
            )}
          </Link>
          <div className="ml-3 pt-0.5">
            <Link
              href={`/profile/${post?.user_id}`}
              className="relative z-10 text-[17px] font-semibold hover:underline"
            >
              {post?.profile.name}
            </Link>

            <div className="relative z-0 text-[13px] -mt-5 font-light">
              {post?.profile.name}
              <span className="relative -top-[2px] text-[30px] pl-1 pr-0.5 ">
                .
              </span>
              <span className="font-medium">
                {moment(post?.created_at).calendar()}
              </span>
            </div>
          </div>
        </div>

        {contextUser?.user?.id == post?.user_id ? (
          <div>
            {isDeleteing ? (
              <BiLoaderCircle className="animate-spin" size="25" />
            ) : (
              <button disabled={isDeleteing} onClick={() => deletePost()}>
                <BsTrash3 className="cursor-pointer" size="25" />
              </button>
            )}
          </div>
        ) : null}
      </div>

      <p className=" mt-4 text-md">{post?.text}</p>

      <p className="flex items-center gap-2 mt-4 text-sm">
        <ImMusic size="12" />
        Originalton - {post?.profile.name}
      </p>
    </div>

      <div className="flex items-center my-4 gap-4 px-2">
        <ClientOnly>
          <div className="text-center flex items-center gap-2">
            <button
              disabled={hasClickedLike}
              onClick={() => likeOrUnlike()}
              className="rounded-full bg-gray-200 p-1 cursor-pointer"
            >
              {!hasClickedLike ? (
                <AiFillHeart
                  color={likesByPost.length > 0 && userLiked ? "#ff2626" : ""}
                  size="20"
                />
              ) : (
                <BiLoaderCircle className="animate-spin" size="25" />
              )}
            </button>
            <span className="text-xs text-gray-800 font-semibold">
              {likesByPost.length}
            </span>
          </div>
        </ClientOnly>

        <div className="text-center flex items-center gap-2">
          <div className="rounded-full bg-gray-200 p-1 cursor-pointer">
            <BsChatDotsFill size={18} />
          </div>
          <span className="text-xs text-gray-800 font-semibold">
            <ClientOnly>
            {commentsByPost?.length}
            </ClientOnly>
          </span>
        </div>
        <div className="text-center flex items-center gap-2">
          <div className="rounded-full bg-gray-200 p-1 cursor-pointer -rotate-90">
            <PiTagChevronFill  size={18} />
          </div>
          <span className="text-xs text-gray-800 font-semibold">
            <ClientOnly>
            12
            </ClientOnly>
          </span>
        </div>
      </div>
    </div>
  );
}
