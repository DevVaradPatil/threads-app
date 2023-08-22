import SaveThread from "@/components/shared/SaveThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

async function Page({ params }: { params: { id: string } }) {

    const user = await currentUser();

    if(!user) return null;

    const userInfo = await fetchUser(user.id);
    

    return (
        <>
            <SaveThread userId={userInfo.id} threadId={params.id}/>
        </>
    )    }

export default Page;