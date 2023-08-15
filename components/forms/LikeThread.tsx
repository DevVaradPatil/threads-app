"use client";

import { usePathname, useRouter } from "next/navigation";

import { likeThread } from "@/lib/actions/thread.actions";

interface Props {
  userId: string;
  threadId: string;
  name: string;
  image: string;
}

async function LikeThread({ userId, threadId, name, image }: Props) {
  const path = usePathname()
  await likeThread(threadId, userId, name, image, path);
  return <></>;
}

export default LikeThread;
