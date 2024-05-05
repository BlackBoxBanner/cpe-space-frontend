import PostBox from "../_components/mainpostbox.tsx/postbox";
import PostBoxProfile from "../_components/mainpostbox.tsx/postboxprofile";
import Image from 'next/image';
import { cookies } from 'next/headers';
import { getUsers } from '@/libs/utils/users/get';
import { AiOutlineFile } from "react-icons/ai";
import { IoArrowUpCircle } from "react-icons/io5";
import { cn } from "@dookdiks/utils";

const CommentPage = async () => {
  const cookieStore = cookies();

  const userId = await cookieStore.get('user-id');

  if (!userId) return;

  const user = await getUsers({ id: userId.value });

  if (user.error) throw new Error('unable to get image');
  return (
    <>
      <PostBox />
      <div className="bg-white w-full border border-[#0D0D0D] rounded-2xl mb-5 pt-3 max-h-[800px]">
        <div>
          <div>
            <PostBoxProfile />
            <div className="ml-[3.2rem] mt-2">
              +1
            </div>
            <hr className="my-2 border-t border-gray mx-3" />
          </div>
          <div className="mt-4">
            <hr className="my-2 border-t border-[#0D0D0D]" />
            <div className="mx-3 my-3 flex items-center gap-3">
              <div className="rounded-full aspect-square w-8 h-8 overflow-hidden bg-alabaster border border-[#0D0D0D]">
                <Image
                  width={300}
                  height={300}
                  src={`/api/image/${user.data[0].image}`}
                  alt={user.data[0].studentid}
                />
              </div>
              <div className="border border-[#0D0D0D] p-2 text-xs rounded-2xl flex justify-between w-full items-center">
                <input type="text" className="outline-none w-full text-sm" />
                <div className="flex gap-2">
                  <AiOutlineFile className="cursor-pointer" style={{ fontSize: '20px' }} />
                  <IoArrowUpCircle className={cn('fill-orange', 'cursor-pointer')} style={{ fontSize: '20px' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentPage;
