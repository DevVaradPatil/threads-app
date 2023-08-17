import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

async function RightSidebar() {

    const user = await currentUser();
    if (!user) return null;
    
    const result = await fetchUsers({
        userId: user.id,
        searchString: '',
        pageNumber: 1,
        pageSize: 3,
        sortBy: "desc"
      });
      
      const communities = await fetchCommunities({
        pageNumber: 1,
        pageSize: 3,
      });

    return (
        <section className="custom-scrollbar rightsidebar">
            <div className="flex flex-1 flex-col justify-start">
                <h3 className="text-heading4-medium text-light-1">Newest Communities</h3>
                {communities.communities.map((community)=>(
                    <Link href={`/communities/${community.id}`} className="cursor-pointer">
                    <div className="flex w-full bg-dark-1 my-2 py-2 px-2 rounded-lg items-center gap-2">
                    <Image src={community.image} alt="user image" width={18} height={18} className="rounded-full"/>
                    <p className="text-base-regular text-light-2">{community.name.slice(0,25)}{community.name.length > 25 ? "...": ""}</p>
                    </div>
                    </Link>
                ))}
            </div>
            <div className="flex flex-1 flex-col justify-start">
                <h3 className="text-heading4-medium text-light-1">Newest Users</h3>
                {result.users.map((user)=>(
                    <Link href={`/profile/${user.id}`} className="cursor-pointer">
                    <div className="flex w-full bg-dark-1 my-2 py-2 px-2 rounded-lg items-center gap-2">
                    <Image src={user.image} alt="user image" width={18} height={18} className="rounded-full"/>
                    <p className="text-base-regular text-light-2">{user.name.slice(0,25)}{user.name.length > 25 ? "...": ""}</p>
                    </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default RightSidebar;