import RepostThread from "@/components/forms/RepostThread";
import {fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect} from "next/navigation";

async function Page({ params }: { params: { id: string } }) {

    const user = await currentUser();

    if(!user) return null;

    const userInfo = await fetchUser(user.id);

    if(!userInfo?.onboarded) redirect('/onboarding');

    const thread = await fetchThreadById(params.id);
    const threadtext = thread.text.toString()
    const threadauthor = thread.author._id.toString()

    return (
        <>
            <RepostThread userId={userInfo.name.toString()} threadtext={threadtext} threadauthor={threadauthor}/>
        </>
    )    }

export default Page;