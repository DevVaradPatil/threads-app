import LikeThread from "@/components/forms/LikeThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

async function Page({ params }: { params: { id: string } }) {

    const user = await currentUser();

    if(!user) return null;

    const userInfo = await fetchUser(user.id);
    return (
        <>
            <LikeThread userId={userInfo.id} threadId={params.id}/>
        </>
    )    }

export default Page;