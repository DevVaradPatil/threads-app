"use client";

import { usePathname, useRouter } from "next/navigation";

import { likeThread } from "@/lib/actions/thread.actions";

interface Props {
  userId: string;
  threadId: string;
}

async function LikeThread({ userId, threadId }: Props) {
  
  await likeThread(threadId, userId);

  return <></>;
}

export default LikeThread;
