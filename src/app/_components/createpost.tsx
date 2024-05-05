import Link from 'next/link';
import Image from 'next/image';
import { cookies } from 'next/headers';
import { getUsers } from '@/libs/utils/users/get';
import { BiImage } from 'react-icons/bi';

const CreatePost = async () => {
  const cookieStore = cookies();

  const userId = await cookieStore.get('user-id');

  if (!userId) return;

  const user = await getUsers({ id: userId.value });

  if (user.error) throw new Error('unable to get image');
  return (
    <>
      <Link href="/createpost" passHref legacyBehavior>
        <div className="bg-white w-full border border-[#0D0D0D] rounded-2xl mb-5 p-3 flex justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-full aspect-square w-10 overflow-hidden bg-alabaster border border-[#0D0D0D]">
              <Image
                width={300}
                height={300}
                src={`/api/image/${user.data[0].image}`}
                alt={user.data[0].studentid}
              />
            </div>
            <div className="text-[#BEBFB6]">
              How about sharing something exciting today ?
            </div>
          </div>
          <div className="content-center ">
            <BiImage style={{ fontSize: '1.5rem' }} />
          </div>
        </div>
      </Link>
    </>
  );
};

export default CreatePost;
