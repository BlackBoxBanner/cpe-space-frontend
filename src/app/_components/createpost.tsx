import Link from 'next/link';
import Image from 'next/image';
import { cookies } from 'next/headers';
import { getUsers } from '@/libs/utils/users';
import { BiImage } from 'react-icons/bi';

const CreatePost = async () => {
  const cookieStore = cookies();

  const userId = await cookieStore.get('user-id');

  if (!userId) return;

  const user = await getUsers({ id: userId.value });

  if (user.error) throw new Error('unable to get image');
  return (
    <>
      <Link href="/createpost">
        <div className="bg-white w-full border border-[#0D0D0D] rounded-3xl p-3 py-4 text-xl flex justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-full aspect-square w-11 overflow-hidden bg-alabaster border border-[#0D0D0D]">
              <Image
                width={300}
                height={300}
                src={`/api/image/${user.data[0].image}`}
                alt={user.data[0].studentid}
                className="bg-cover object-cover w-full h-full"
              />
            </div>
            <div className="text-[#BEBFB6]">
              How about sharing something exciting today ?
            </div>
          </div>
          <div className="content-center ">
            <BiImage size={28} style={{ fontSize: '1.5rem' }} />
          </div>
        </div>
      </Link>
    </>
  );
};

export default CreatePost;
