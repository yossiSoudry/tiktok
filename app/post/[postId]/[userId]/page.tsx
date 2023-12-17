import useGetPostsByUser from "@/actions/getPostsByUserId";
import Comments from "@/app/components/post/Comments";
import CommentsHeader from "@/app/components/post/CommentsHeader";
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";
import useGetPostById from "@/app/hooks/useGetPostById";
import { PostPageTypes } from "@/app/types";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import PostPageLayout from "../../_components/PostPageLayout";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { CiFlag1 } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { GiSpeaker } from "react-icons/gi";

export default async function Post({ params }: PostPageTypes) {
  const postById = await useGetPostById(params.postId);
  const postsByUser = await useGetPostsByUser(params.userId);
  // const likesByPost = await useGetLikesByPostId(params.postId)
  // const commentsByPost = await useGetCommentsByPostId(params.postId)

  // const loopThroughPostsUp = () => {
  //   postsByUser.forEach((post) => {
  //     if (post.id > params.postId) {
  //       redirect(`/post/${post.id}/${params.userId}`);
  //     }
  //   });
  // };

  // const loopThroughPostsDown = () => {
  //   postsByUser.forEach((post) => {
  //     if (post.id < params.postId) {
  //       redirect(`/post/${post.id}/${params.userId}`);
  //     }
  //   });
  // };

  return (
    <>
      <PostPageLayout params={params}>
        <div className="lg:w-[calc(100%-540px)] h-full relative">
          <Link
            href={`/profile/${params?.userId}`}
            className="absolute text-slate-200 z-20 m-5 rounded-full bg-neutral-700 p-1.5 hover:bg-neutral-800 max-sm:hidden"
          >
            <AiOutlineClose size="24" />
          </Link>

          <div className="absolute right-4 max-sm:hidden min-h-screen flex flex-col justify-between z-20 py-5 items-end">
            <button
              // onClick={() => loopThroughPostsUp()}
              className="rounded-full bg-neutral-700 py-1 px-3 hover:bg-neutral-800 w-auto h-10 text-slate-200 flex justify-center items-center gap-1 text-sm font-semibold"
            >
              <CiFlag1 size="20" color="#FFFFFF" />Report
            </button>
            <div className="flex flex-col gap-4">
            <button
              // onClick={() => loopThroughPostsDown()}
              className="rounded-full bg-neutral-700 hover:bg-neutral-800 w-10 h-10 text-slate-200 flex justify-center items-center"
            >
              <IoIosArrowUp size="30" color="#FFFFFF" />
            </button>
            <button
              // onClick={() => loopThroughPostsUp()}
              className="rounded-full bg-neutral-700 p-1.5 hover:bg-neutral-800 w-10 h-10 text-slate-200 flex justify-center items-center"
            >
              <IoIosArrowDown size="30" color="#FFFFFF" />
            </button>
            </div>

            <button
              // onClick={() => loopThroughPostsDown()}
              className="rounded-full bg-neutral-700 p-1.5 hover:bg-neutral-800 w-10 h-10 text-slate-200 flex justify-center items-center"
            >
              <GiSpeaker size="30" color="#FFFFFF" />
            </button>
          </div>

          {/* <img
            className="absolute z-20 top-[18px] left-[70px] rounded-full lg:mx-0 mx-auto max-sm:hidden"
            width="45"
            src="/images/tiktok-logo-small.png"
          /> */}

          {postById?.video_url ? (
            <video
              className="fixed object-cover w-full my-auto z-[0] blur-xl"
              src={useCreateBucketUrl(postById?.video_url)}
            />
          ) : null}

          <div className="bg-neutral-950/75 lg:min-w-[480px] z-10 relative">
            {postById?.video_url ? (
              <video
                autoPlay
                // controls
                loop
                muted
                className="h-screen mx-auto"
                src={useCreateBucketUrl(postById.video_url)}
              />
            ) : null}
          </div>
        </div>

        <div
          id="InfoSection"
          className="lg:max-w-[550px] relative w-full h-full bg-white max-sm:hidden min-h-screen"
        >
          <div className="py-3" />

            {postById ? (
              <CommentsHeader post={postById} params={params} />
            ) : null}
          <Comments params={params} />
        </div>
      </PostPageLayout>
    </>
  );
}
