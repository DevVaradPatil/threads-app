import UserCard from "@/components/cards/UserCard";
import { fetchUser, fetchUsers, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

async function Page() {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const { replies, likesActivity } = await getActivity(userInfo._id);
  
  const filteredLikesActivity = likesActivity.filter(activity => 
    activity.likes.every((like: any) => like._id.toString() !== userInfo.id.toString())
  );
  console.log('FILTER:-----------------------------' ,filteredLikesActivity)
  
  
  const result = await fetchUsers({
    userId: user.id,
    searchString: '',
    pageNumber: 1,
    pageSize: 25,
  });
  
  return (
    <section>
      <h1 className="head-text mb-10">Activity</h1>
      <section className="mt-10 flex flex-col gap-5">
        {replies.length > 0 || likesActivity.length > 0 ? (
          <>
            {replies.map((activity) => (
              <Link key={activity._id} href={`thread/${activity.parentId}`}>
                <article className="activity-card">
                  <Image
                    src={activity.author.image}
                    alt="profile picture"
                    width={20}
                    height={20}
                    className="rounded-full object-cover"
                  />
                  <p className="!text-small-regular text-light-1">
                    <span className="mr-1 text-primary-500">
                      {activity.author.name}
                    </span>{" "}
                    replied to your thread
                  </p>
                </article>
              </Link>
            ))}
            {filteredLikesActivity.map((activity) => (
  <Link key={activity._id} href={`thread/${activity._id}`}>
    <article className="activity-card">
      <Image
        src={activity.likes[0].image}
        alt="profile picture"
        width={20}
        height={20}
        className="rounded-full object-cover"
      />
      <p className="!text-small-regular text-light-1">
        {activity.likes.length > 0 && (
          <span className="mr-1 text-primary-500">
            {activity.likes.map((like: any, index: any) => (
              <span key={like._id}>
                {like.name}
                {index !== activity.likes.length - 1 ? ", " : ""}
              </span>
            ))}
          </span>
        )}
        liked your thread
      </p>
    </article>
  </Link>
))}
          </>
        ) : (
          <p className="!text-base-regular text-light-3">No activity yet</p>
        )}
      </section>
    </section>
  );
}

export default Page;
