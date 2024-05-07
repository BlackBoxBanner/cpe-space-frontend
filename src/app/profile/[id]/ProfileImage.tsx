import Image from 'next/image';
import { cookies } from 'next/headers';
import { getUsers } from '@/libs/utils/users/get';
import { BiCamera } from 'react-icons/bi';

const ProfileImage = async () => {
    const cookieStore = cookies();

    const userId = await cookieStore.get('user-id');

    if (!userId) return;

    const user = await getUsers({ id: userId.value });

    if (user.error) throw new Error('unable to get image');
    return (
        <div>
            <div className='bg-smoky-black h-[92vh] rounded-xl overflow-hidden m-8 border border-smoky-black relative'>
                <Image
                    className=''
                    width={3000}
                    height={3000}
                    src={`/api/image/${user.data[0].image}`}
                    alt={user.data[0].studentid}
                />
            </div>
        </div>
    );
};

export default ProfileImage;
