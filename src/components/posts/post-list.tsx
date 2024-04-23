import type { PostWithDetails } from "@/db/queries/posts";
import Link from "next/link";
import paths from "@/paths";
import { Button } from "@nextui-org/react";

interface PostListProps {
  fetchData: () => Promise<PostWithDetails[]>;
}

export default async function PostList({ fetchData }: PostListProps) {
  const posts = await fetchData();

  const renderedPosts = posts.map((post) => {
    const topicSlug = post.topic.slug;

    if (!topicSlug) {
      throw new Error("Need a slug to link to a post");
    }

    return (
      <div key={post.id} className="rounded border p-2">
        <Link href={paths.postShow(topicSlug, post.id)}>
          <h3 className="text-lg font-bold">{post.title}</h3>
          <div className="flex flex-row gap-8">
            <p className="text-xs text-gray-400">By {post.user.name}</p>
            <p className="text-xs text-gray-400">
              {post._count.comments} comments
            </p>
          </div>
        </Link>
      </div>
    );
  });

  if (renderedPosts.length < 1)
    return (
      <div className="mx-auto flex w-fit flex-col items-center gap-6">
        <p className="text-2xl text-red-400">No post was found!</p>
        <Link href="/">
          <Button>&larr; Go Back home</Button>
        </Link>
      </div>
    );

  return <div className="space-y-2">{renderedPosts}</div>;
}
