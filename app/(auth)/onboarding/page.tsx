import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

async function Page(){

    const user = await currentUser();
    if (!user) return null;
    
    const userInfo = await fetchUser(user.id);


    const userData = {
        id: user?.id,
        objectId: userInfo?._id,
        username: userInfo?.username || user?.username,
        name: userInfo?.name || user?.firstName || "",
        bio: userInfo?.bio || "",
        image: userInfo?.image || user?.imageUrl,
    }

    return (
        <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-10 ">
            <h1 className="head-text">{`${userInfo?.onboarded ?  'Edit Profile': 'Onboarding'}`}</h1>
            <p className="mt-3 text-base-regular text-light-2">
            {`${userInfo?.onboarded ?  'Edit your profile as you want': 'Complete your profile now to continue to Threads'}`}
            </p>
            <section className="mt-6 bg-dark-2 p-10">
                <AccountProfile user={userData} btnTitle="Continue"/>
            </section>
        </main>
    )
}

export default Page;