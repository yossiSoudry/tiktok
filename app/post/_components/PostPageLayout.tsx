"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { redirect, useRouter } from "next/navigation";
import ClientOnly from "@/app/components/ClientOnly";
import { Post, PostPageLayoutTypes, PostPageTypes } from "@/app/types";
import Comments from "@/app/components/post/Comments";
import CommentsHeader from "@/app/components/post/CommentsHeader";
import { usePostStore } from "@/app/stores/post";
import { useLikeStore } from "@/app/stores/like";
import { useCommentStore } from "@/app/stores/comment";
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";
import { useSwipeable } from "react-swipeable";

export default function PostPageLayout({
  children,
  params,
}: PostPageLayoutTypes) {
  const [swipeTranslation, setSwipeTranslation] = useState(0);

  let { postById, postsByUser, setPostById, setPostsByUser } = usePostStore();
  let { setLikesByPost } = useLikeStore();
  let { setCommentsByPost } = useCommentStore();

  const router = useRouter();

  useEffect(() => {
    setPostById(params.postId);
    setCommentsByPost(params.postId);
    setLikesByPost(params.postId);
    setPostsByUser(params.userId);
  }, []);
  const loopThroughPostsUp = () => {
    postsByUser.forEach((post) => {
      if (post.id > params.postId) {
        router.push(`/post/${post.id}/${params.userId}`);
      }
    });
  };

  const loopThroughPostsDown = () => {
    postsByUser.forEach((post) => {
      if (post.id < params.postId) {
        router.push(`/post/${post.id}/${params.userId}`);
      }
    });
  };

  useEffect(() => {
    const element = document.getElementById("PostPage");

    if (element) {
      const disableScroll = (e: any) => {
        e.preventDefault();
      };

      element.addEventListener("touchstart", disableScroll, { passive: false });
      element.addEventListener("touchmove", disableScroll, { passive: false });

      return () => {
        element.removeEventListener("touchstart", disableScroll);
        element.removeEventListener("touchmove", disableScroll);
      };
    }
  }, []);

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      eventData.event.preventDefault();
      setSwipeTranslation(eventData.deltaY);
    },
    onSwiped: (eventData) => {
      eventData.event.preventDefault();
      if (eventData.dir === "Up") {
        loopThroughPostsUp();
      } else if (eventData.dir === "Down") {
        loopThroughPostsDown();
      }
      setSwipeTranslation(0);
    },
    trackMouse: true,
  });
  return (
    <>
      <div
        id="PostPage"
        className="lg:flex justify-between w-full bg-black no-scroll 
        max-sm:h-screen
        "
        {...handlers}
        style={{ transform: `translateY(${swipeTranslation}px)` }}
      >
        {children}
      </div>
    </>
  );
}
