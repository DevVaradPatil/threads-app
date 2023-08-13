"use client";

import { useOrganization } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";

import { createThread } from "@/lib/actions/thread.actions";

interface Props {
  userId: string;
  threadtext: string;
  threadauthor: string;
}

async function RepostThread({ userId, threadtext, threadauthor }: Props) {

  const router = useRouter();
  const pathname = usePathname();
    console.log('THREAD TEXT: ' , threadtext);
    console.log('THREAD TEXT: ' , threadauthor);
    console.log(userId);
    
  const { organization } = useOrganization();
    await createThread({
      text: threadtext,
      author: threadauthor,
      communityId: organization ? organization.id : null,
      path: pathname,
      repostauthor: userId
    });

    router.push("/");


  return (
    <>
    </>
  );
}

export default RepostThread;