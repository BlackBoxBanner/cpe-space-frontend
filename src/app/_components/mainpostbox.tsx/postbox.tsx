import { BsStar } from 'react-icons/bs';
import { cn } from '@dookdiks/utils';
import { BiMessageSquareDots, BiShareAlt } from 'react-icons/bi';
import Link from 'next/link';
import PostBoxTop from './postboxtop';

const PostBox = () => {
  return (
    <>
      <div className="bg-white w-full border border-[#0D0D0D] rounded-2xl pt-3 max-h-[800px] ">
        <PostBoxTop />
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
          <div className="flex gap-8">
            <div className="flex gap-1.5 items-center">
              <BsStar className={cn('fill-alabaster', 'cursor-pointer')} />
              <div className="text-white text-sm">1.2k</div>
            </div>
            <div className="flex gap-1.5 items-center">
              <Link href="/comment" passHref legacyBehavior>
                <BiMessageSquareDots
                  className={cn('fill-alabaster', 'cursor-pointer')}
                />
              </Link>
              <div className="text-white text-sm">3k</div>
            </div>
          </div>
          <BiShareAlt className={cn('fill-alabaster', 'cursor-pointer')} />
        </div>
      </div>
    </>
  );
};

export default PostBox;
