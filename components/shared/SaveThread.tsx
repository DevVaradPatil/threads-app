"use client";

import { saveThread } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";


interface Props {
  userId: string;
  threadId: string;
}

async function SaveThread({ userId, threadId }: Props) {
  const path = usePathname()
  const router = useRouter();
  saveThread(userId, threadId)
  router.push('/')
  return <></>;
}

export default SaveThread;
