'use client';

import {
  UserSchema,
  PostSchema,
  CommentSchema,
  CommunitiesSchema,
  TopicSchema,
  PostTopicSchema,
  PostLikesSchema,
} from '@/types/zodSchema';
import { cn } from '@dookdiks/utils';
import Image from 'next/image';
import { useState } from 'react';
import { BiMessageSquareDots, BiShareAlt } from 'react-icons/bi';
import { BsStar } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa';
import { z } from 'zod';
import { CommentSection } from './commentSection';

export type PostType = {
  user: z.infer<typeof UserSchema>;
  PostTopic: z.infer<typeof PostTopicSchema>[];
  comments: (z.infer<typeof CommentSchema> & {
    user: z.infer<typeof UserSchema>;
  })[];
  communities: z.infer<typeof CommunitiesSchema> | null;
  topics: z.infer<typeof TopicSchema>[];
  postLikes: z.infer<typeof PostLikesSchema>[];
} & z.infer<typeof PostSchema>;

export const Post = ({
  post,
  single = false,
}: {
  post: PostType;
  single?: boolean;
}) => {
  const [showComment, setShowComment] = useState(false);

  const toggleShowComment = () => {
    setShowComment(e => !e);
  };

  console.log(post);

  return (
    <section className={cn('flex flex-col gap-4')}>
      <div
        className={cn(
          'flex rounded-3xl border bg-white border-smoky-black flex-col overflow-hidden',
        )}
      >
        <div className={cn('flex p-3 pt-2 pb-0 justify-between')}>
          <div className="flex items-center gap-4">
            <div className="rounded-full aspect-square overflow-hidden h-8 w-auto">
              <Image
                src={`/api/image/${post.user.image}`}
                alt={`${post.user.name} image`}
                width={300}
                height={300}
                className="bg-cover object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex text-xl gap-2">
                <p>{post.user.name}</p>
                {post.communities?.name && (
                  <>
                    <p className="text-liberty">-</p>
                    <p className="text-liberty">{post.communities?.name}</p>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-white">
                {getTimeDifferenceString(new Date(post.createdAt))}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {post.topics.map(topic => (
              <TopicBadge key={topic.id} topic={topic.name} />
            ))}
          </div>
        </div>
        <div
          className={cn(
            'p-3 min-h-14 h-auto font-light',
            !single ? 'max-h-[35rem]' : '',
            post.content.length <= 100 ? 'text-2xl' : 'text-xl',
          )}
        >
          {post.content}
        </div>
        <div className="px-4 bg-liberty py-2 text-alabaster flex justify-between items-center">
          <div className="grid grid-cols-[auto,3rem,auto,3rem] gap-2 place-items-start text-sm items-center">
            {/* TODO - Handle form submit */}
            <form>
              <button>
                {post.postLikes.find(e => e.userId === post.user.id) ? (
                  <FaStar size={23} />
                ) : (
                  <BsStar size={23} />
                )}
              </button>
            </form>
            <div>{formatNumber(post.likes)}</div>
            {/* TODO - Toggle comment section */}
            <button onClick={toggleShowComment}>
              <BiMessageSquareDots size={23} />
            </button>
            <div>{formatNumber(post.comments.length)}</div>
          </div>
          <div className="flex justify-center items-center">
            {/* TODO - share post link (copy to clipboard) */}
            <button>
              <BiShareAlt size={23} />
            </button>
          </div>
        </div>
      </div>
      {showComment && (
        <CommentSection comments={post.comments} user={post.user} />
      )}
    </section>
  );
};

const getTimeDifferenceString = (createAt: Date) => {
  const currentTime: Date = new Date();
  const timeDiffInSeconds: number = Math.ceil(
    (currentTime.getTime() - createAt.getTime()) / 1000,
  );

  if (timeDiffInSeconds < 60) {
    return `${timeDiffInSeconds} second${timeDiffInSeconds !== 1 ? 's' : ''} ago`;
  } else if (timeDiffInSeconds < 3600) {
    const minutes: number = Math.floor(timeDiffInSeconds / 60);
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } else if (timeDiffInSeconds < 86400) {
    const hours: number = Math.floor(timeDiffInSeconds / 3600);
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else if (timeDiffInSeconds < 2592000) {
    const days: number = Math.floor(timeDiffInSeconds / 86400);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  } else if (timeDiffInSeconds < 31536000) {
    const months: number = Math.floor(timeDiffInSeconds / 2592000);
    return `${months} month${months !== 1 ? 's' : ''} ago`;
  } else {
    const years: number = Math.floor(timeDiffInSeconds / 31536000);
    return `${years} year${years !== 1 ? 's' : ''} ago`;
  }
};

const formatNumber = (num: number) => {
  if (num < 1000) {
    return num.toString();
  } else {
    const roundedNum = Math.floor(num / 100) / 10;
    return `${roundedNum}K`;
  }
};

const TopicBadge = ({ topic }: { topic: string }) => {
  return (
    <div className="py-[0.15rem] px-3 min-w-[5.5rem] border text-center border-liberty rounded-xl text-liberty font-light">
      {topic}
    </div>
  );
};
