import Image from 'next/image';
import { cookies } from 'next/headers';
import { getUsers } from '@/libs/utils/users';
import { BiImage } from "react-icons/bi";

const CreatePostTopPart = async () => {

    const cookieStore = cookies();

    const userId = await cookieStore.get('user-id');

    if (!userId) return;

    const user = await getUsers({ id: userId.value });

    if (user.error) throw new Error('unable to get image');

    const firstName = user.data[0].name.split(' ')[0];
    const lastName = user.data[0].name.split(' ')[1];
    return (
        <div>
            <div className='flex justify-between items-center'>
                <div className='flex items-center'>
                    <div className="rounded-full aspect-square w-10 h-10 overflow-hidden bg-alabaster border border-[#0D0D0D]">
                        <Image
                            width={300}
                            height={300}
                            src={`/api/image/${user.data[0].image}`}
                            alt={user.data[0].studentid}
                        />
                    </div>
                    <div className='text-xl ml-3 font-medium'>
                        {firstName} {lastName[0]}
                    </div>
                </div>
                <label
                    htmlFor="image-create-post"
                >
                    <div className='cursor-pointer'><BiImage size={30} /></div>
                </label>
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    id="image-create-post"
                    className="hidden absolute"
                />

            </div>
            <div className='text-4xl my-6 w-full '>
            <textarea
                        placeholder="Write..."
                        className='outline-none w-full'
                        rows={4}
                    />
            </div>
        </div>
    )
}
export default CreatePostTopPart;