import {
  UserSchema,
  PostSchema,
  CommentSchema,
  CommunitiesSchema,
  TopicSchema,
  PostTopicSchema,
} from '@/types/zodSchema';
import { cn } from '@dookdiks/utils';
import Image from 'next/image';
import { z } from 'zod';

export type PostType = {
  user: z.infer<typeof UserSchema>;
  PostTopic: z.infer<typeof PostTopicSchema>[];
  comments: z.infer<typeof CommentSchema>[];
  communities: z.infer<typeof CommunitiesSchema> | null;
  topics: z.infer<typeof TopicSchema>[];
} & z.infer<typeof PostSchema>;

export const Post = ({ post }: { post: PostType }) => {
  return (
    <section className={cn('flex flex-col gap-4')}>
      <div className={cn('flex rounded-3xl border border-smoky-black p-4')}>
        <div className={cn('flex gap-2')}>
          <div className="rounded-full aspect-square overflow-hidden w-8">
            <Image
              src={`/api/image/${post.user.image}`}
              alt={`${post.user.name} image`}
              width={300}
              height={300}
              className="bg-cover object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex text-xl">
              <p>{post.user.name}</p>
              {post.communities?.name && <p>{`- ${post.communities?.name}`}</p>}
            </div>
            <p>1mins</p>
          </div>
        </div>
      </div>
      <div className={cn('flex rounded-2xl border border-smoky-black')}>a</div>
    </section>
  );
};
