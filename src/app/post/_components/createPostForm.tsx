'use client';

import { PostSchema, UserSchema } from '@/types/zodSchema';
import { useCreatePostContext } from './context';
import CreatePostTopPart from './createPostTop';
import TagOfCreatePost from './tagOfCreatePost';
import { z } from 'zod';
import { axios } from '@/libs/axiosInstance';
import { ReturnResponse } from '@/types/ResponseType';
import { useRouter } from 'next/navigation';

type UserType = z.infer<typeof UserSchema>;
type PostType = z.infer<typeof PostSchema>;

const CreatePostForm = ({ user }: { user: Omit<UserType, 'password'> }) => {
  const { selectedCommunities, selectedTags, content } = useCreatePostContext();

  const router = useRouter();

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await axios.post<ReturnResponse<PostType>>('/api/post', {
      data: {
        content,
        communitiesId: selectedCommunities[0],
        topicId: selectedTags,
      },
    });

    if (res.data.error) return alert('error');

    router.push('/');

    console.log({ content, selectedCommunities, selectedTags });
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="bg-white w-full p-4 rounded-xl border border-smoky-black mt-6"
    >
      <div>
        <CreatePostTopPart user={user} />
        <hr className="my-2 border-t border-gray" />
        <TagOfCreatePost />
      </div>
    </form>
  );
};

export default CreatePostForm;
