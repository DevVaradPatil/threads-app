"use client";

import { saveThread } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";


interface Props {
  userId: string;
  threadId: string;
}

async function SaveThread({ userId, threadId }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  saveThread(userId, threadId, pathname)
  router.push('/')
  return <></>;
}

export default SaveThread;
