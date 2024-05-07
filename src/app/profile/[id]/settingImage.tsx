import Image from 'next/image';
import { cookies } from 'next/headers';
import { getUsers } from '@/libs/utils/users/get';
import { BiCamera } from 'react-icons/bi';

const SettingImage = async () => {
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
                <label
                    htmlFor="image-community-create-input"
                    className="absolute bottom-4 right-4 bg-liberty aspect-square w-12 flex justify-center items-center cursor-pointer rounded-full"
                >
                    <BiCamera size={25} className="text-white text-xl" />
                </label>
            </div>
            <input
                type="file"
                name="image"
                accept="image/*"
                id="image-setting-update"
                className="hidden absolute"
            />
        </div>
    );
};

export default SettingImage;
