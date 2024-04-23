// import type { Post } from "@prisma/client";
import { db } from "@/db";

// export type PostWithDetails = Post & {
//   topic: { slug: string };
//   user: { name: string | null };
//   _count: { comments: number };
// };
// // Promise<PostWithDetails[]> // use for return of fn, if above type is used

export function fetchPostBySearchterm(
  term: string,
): Promise<PostWithDetails[]> {
  return db.post.findMany({
    where: {
      OR: [{ title: { contains: term } }, { content: { contains: term } }],
    },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true, image: true } },
      _count: { select: { comments: true } },
    },
  });
}

export type PostWithDetails = Awaited<
  ReturnType<typeof fetchPostByTopicSlug>
>[number];

export function fetchPostByTopicSlug(slug: string) {
  return db.post.findMany({
    where: { topic: { slug } },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });
}
export function fetchTopPost(): Promise<PostWithDetails[]> {
  return db.post.findMany({
    orderBy: [{ comments: { _count: "desc" } }],
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true, image: true } },
      _count: { select: { comments: true } },
    },
    take: 5,
  });
}
