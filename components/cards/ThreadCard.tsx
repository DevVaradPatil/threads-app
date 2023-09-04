import Image from "next/image";
import Link from "next/link";

import { formatDateString } from "@/lib/utils";
import DeleteThread from "../forms/DeleteThread";
import Buttons from "../shared/Buttons";
import RepostButton from "../shared/RepostButton";
import LikeButton from "../shared/LikeButton";
interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  repostauthor: string;
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
  likes: {
    _id: string;
    name: string;
    image: string;
  }[];
  isSaved?: boolean;
}

function ThreadCard({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
  repostauthor,
  likes,
  isSaved,
}: Props) {
  let currentUserLiked = likes.some((like) => like._id === currentUserId);
  const date = new Date(createdAt);
  const now = new Date();
  
  const timeDifferenceInSeconds = Math.floor(
    (now.getTime() - date.getTime()) / 1000
  );
  let formattedTimeAgo = "";

  if (timeDifferenceInSeconds < 60) {
    formattedTimeAgo = `${timeDifferenceInSeconds}s ago`;
  } else if (timeDifferenceInSeconds < 3600) {
    const minutes = Math.floor(timeDifferenceInSeconds / 60);
    formattedTimeAgo = `${minutes}min ago`;
  } else if (timeDifferenceInSeconds < 86400) {
    const hours = Math.floor(timeDifferenceInSeconds / 3600);
    formattedTimeAgo = `${hours}hr ago`;
  } else if (timeDifferenceInSeconds < 604800) {
    const days = Math.floor(timeDifferenceInSeconds / 86400);
    formattedTimeAgo = `${days}d ago`;
  } else {
    const weeks = Math.floor(timeDifferenceInSeconds / 604800);
    formattedTimeAgo = `${weeks}w ago`;
  }
  const newid = id.toString();
  
  return (
    <article
      className={`flex w-full flex-col rounded-xl h-full ${
        isComment ? "px-0 xs:px-7" : "p-7 bg-dark-2"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="user_community_image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>

            <div className="thread-card_bar" />
          </div>

          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {author.name}
              </h4>
              {repostauthor && (
                <h4 className="text-base-regular text-gray-1">
                  Reposted by {repostauthor}
                </h4>
              )}
            </Link>

            <p className="mt-2 text-base-regular text-light-2">{content}</p>

            <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}>
              <div className="flex gap-3.5">
                <Link
                  href={`/like/${id}`}
                  className="flex items-center justify-center  "
                >
                  <LikeButton currentUserLiked={currentUserLiked}/>
                  {likes.length > 0 && (
                    <span className="text-subtle-medium text-gray-1 px-1">
                      {likes.length}
                    </span>
                  )}
                </Link>
                <Link href={`/thread/${id}`}>
                  <Image
                    src="/assets/reply.svg"
                    alt="heart"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain transition"
                  />
                </Link>
                <RepostButton id={newid}/>
                <Buttons id={newid} isSaved={isSaved}/>
              </div>

              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>

        <DeleteThread
          threadId={JSON.stringify(id)}
          currentUserId={currentUserId}
          authorId={author.id}
          parentId={parentId}
          isComment={isComment}
        />
      </div>

      {!isComment && comments.length > 0 && (
        <div className="ml-1 mt-3 flex items-center gap-2">
          {comments.slice(0, 2).map((comment, index) => (
            <Image
              key={index}
              src={comment.author.image}
              alt={`user_${index}`}
              width={24}
              height={24}
              className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
            />
          ))}

          <Link href={`/thread/${id}`}>
            <p className="mt-1 text-subtle-medium text-gray-1">
              {comments.length} repl{comments.length > 1 ? "ies" : "y"}
            </p>
          </Link>
        </div>
      )}
      <p className="ml-1 mt-3 flex items-center gap-2  text-subtle-medium text-gray-1">
        {formattedTimeAgo}
      </p>

      {!isComment && community && (
        <Link
          href={`/communities/${community.id}`}
          className="mt-5 flex items-center"
        >
          <p className="text-subtle-medium text-gray-1">
            {formatDateString(createdAt)}
            {community && ` - ${community.name} Community`}
          </p>

          <Image
            src={community.image}
            alt={community.name}
            width={14}
            height={14}
            className="ml-1 rounded-full object-cover"
          />
        </Link>
      )}
    </article>
  );
}

export default ThreadCard;
