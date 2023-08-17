import { redirect } from "next/navigation";

import { fetchUser } from "@/lib/actions/user.actions";

import ThreadCard from "../cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.actions";

interface Props {
  currentUserId: string;
  accountId: string;
}

async function RepliesTab({ currentUserId, accountId }: Props) {
  const result = await fetchPosts();
  const user = await fetchUser(accountId);
  const userId = user._id;

  const threads = result.posts.filter((post) => {
    const hasChildWithUserId = post.children.some(
      (child: any) => child.author._id.toString() === userId.toString()
    );
    return hasChildWithUserId;
  });

  if (!result) {
    redirect("/");
  }
  return (
    <section className="mt-9 flex flex-col gap-10">
      {threads.map((post) => (
        <ThreadCard
          key={post._id}
          id={post._id}
          currentUserId={currentUserId}
          parentId={post.parentId}
          content={post.text}
          author={post.author}
          community={post.community}
          createdAt={post.createdAt}
          comments={post.children}
          repostauthor={post.repostauthor}
          likes={post.likes}
        />
      ))}
    </section>
  );
}

export default RepliesTab;
