"use client"
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  type?: 'User' | 'Community';
}

const ProfileHeader = ({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  type
}: Props) => {
  const router = useRouter();
  return (
    <div className="flex w-full flex-col justify-start">
      <div className="felx items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="relative h-20 w-20 object-cover">
                <Image src={imgUrl} alt="Profile Image" fill className="rounded-full object-cover shadow-2xl"/>
            </div>
            <div className="flex-1">
                <h2 className="text-left text-heading3-bold text-light-1">{name}</h2>
                <p className="text-base-medium text-gray-1">@{username}</p>
            </div>
            {(accountId === authUserId) && (
            <div>
              <Button className="bg-light-3 text-light-1 text-[12px]" onClick={()=> router.push('/onboarding')}>
                Edit Profile
              </Button>
            </div>
            )
          }
        </div>
      </div>
        {/* { TODO: Community} */}
        <p className="mt-6 max-w-lg text-base-regular text-light-2">{bio}</p>
        <div className="mt-12 h-0.5 w-full bg-dark-3"/>
    </div>
  );
};

export default ProfileHeader;
