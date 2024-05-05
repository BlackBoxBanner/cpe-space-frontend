import Image from 'next/image';
import { cookies } from 'next/headers';
import { getUsers } from '@/libs/utils/users/get';

const PostBoxProfile = async () => {
    const cookieStore = cookies();

    const userId = await cookieStore.get('user-id');

    if (!userId) return;

    const user = await getUsers({ id: userId.value });

    if (user.error) throw new Error('unable to get image');
    return (
        <>
           <div className="justify-between flex item-center px-3">
          <div className="flex gap-3 items-center">
            <div className="rounded-full aspect-square w-7 h-7 overflow-hidden bg-alabaster border border-[#0D0D0D]">
              <Image
                width={300}
                height={300}
                src={`/api/image/${user.data[0].image}`}
                alt={user.data[0].studentid}
              />
            </div>
            <div>
              <div className="flex text-sm">
                <div>Nutnarin T</div>
                <div className="text-liberty">- CPE 35</div>
              </div>
              <div className="text-xs text-gray-white">1 minute ago</div>
            </div>
          </div>
        </div>
        </>
    );
};

export default PostBoxProfile;
