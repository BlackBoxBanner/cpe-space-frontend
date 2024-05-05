import Image from 'next/image';
import { cookies } from 'next/headers';
import { getUsers } from '@/libs/utils/users/get';
import { BsStar } from 'react-icons/bs';
import { cn } from '@dookdiks/utils';
import { BiMessageSquareDots, BiShareAlt } from 'react-icons/bi';

const PostBox = async () => {
  const cookieStore = cookies();

  const userId = await cookieStore.get('user-id');

  if (!userId) return;

  const user = await getUsers({ id: userId.value });

  if (user.error) throw new Error('unable to get image');
  return (
    <>
      <div className="bg-white w-full border border-[#0D0D0D] rounded-2xl mb-5 pt-3 max-h-[800px] ">
        <div className="justify-between flex item-center  px-3">
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
          <div className="flex gap-2 items-center">
            <div className="bg-white border border-liberty text-liberty content-center text-xs rounded-xl px-3 h-7">
              Internship
            </div>
          </div>
        </div>
        <div className="mt-4  px-3">
          Yes, this article is about some of the longest English words on
          record. No, you will not find the very longest word in English in this
          article. That one word would span about fifty-seven pages. It’s the
          chemical name for the titin protein found in humans. Its full name has
          189,819 letters. Dictionaries omit the name of this protein and many
          other long words. Obviously, dictionaries have space constraints, and
          the average person would have no need to know the technical names of
          chemicals. Still, there are plenty of lengthy words in dictionaries.
          Let’s take a moment to appreciate a few of them. Yes, this article is
          about some of the longest English words on record. No, you will not
          find the very longest word in English in this article. That one word
          would span about fifty-seven pages. It’s the chemical name for the
          titin protein found in humans. Its full name has 189,819 letters.
          Dictionaries omit the name of this protein and many other long words.
          Obviously, dictionaries have space constraints, and the average
        </div>
        <div className="bg-liberty flex justify-between p-3 rounded-b-xl mt-4">
          <div className="flex gap-9">
            <BsStar className={cn('fill-alabaster')} />
            <BiMessageSquareDots className={cn('fill-alabaster')} />
          </div>
          <BiShareAlt className={cn('fill-alabaster')} />
        </div>
      </div>
    </>
  );
};

export default PostBox;
