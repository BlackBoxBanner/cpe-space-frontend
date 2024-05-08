import { cookies } from 'next/headers';
import { getUsers } from '@/libs/utils/users';
import CreatePostForm from '../_components/createPostForm';

const CreatePostPage = async () => {
  const cookieStore = cookies();

  const userId = await cookieStore.get('user-id');

  if (!userId) return;

  const user = await getUsers({ id: userId.value });

  if (user.error) throw new Error('unable to get image');
  return (
    <div>
      <div className="flex justify-center flex-col">
        <div className="text-[3.5rem] font-bold font-decorate w-full text-center">
          Create post
        </div>
        <CreatePostForm user={user.data[0]} />
      </div>
    </div>
  );
};

export default CreatePostPage;
