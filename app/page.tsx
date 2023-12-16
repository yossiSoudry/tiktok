
import { useEffect } from "react"
import { usePostStore } from "@/app/stores/post"
import ClientOnly from "./components/ClientOnly"
import MainLayout from "./layouts/MainLayout";
import PostMain from "./components/PostMain"
import getAllPosts from "./hooks/getAllPosts";

export default async function Home() {
  const allPosts = await getAllPosts()
  return (
    <>
      <MainLayout>
        <div className="mt-[80px]  w-[calc(100%-90px)] max-w-[690px] mx-auto">
            {allPosts.map((post, index) => (
              <PostMain post={post} key={index} />
            ))}
        </div>
      </MainLayout>
    </>
  )
}

