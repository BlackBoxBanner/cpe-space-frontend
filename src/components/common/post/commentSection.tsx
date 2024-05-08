import { cn } from '@dookdiks/utils';
import Image from 'next/image';
import { MdOutlineArrowUpward } from 'react-icons/md';
import { PostType } from '.';

export const CommentSection = ({
  comments,
  user,
}: {
  comments: PostType['comments'];
  user: PostType['user'];
}) => {
  const formAcrion = (formData: FormData) => {
    const comment = formData.get('comment');
    // TODO - send comment to server
  };

  return (
    <div
      className={cn(
        'flex flex-col justify-between rounded-2xl border border-smoky-black bg-white min-h-[30rem] max-h-[30rem] overflow-y-auto',
      )}
    >
      {comments.map(comment => {
        return (
          <div key={comment.id} className="grid grid-rows-2 gap-2">
            <div className="p-4 py-2 flex">
              <div className="flex items-center gap-4">
                <div className="rounded-full aspect-square overflow-hidden h-8 w-auto">
                  <Image
                    src={`/api/image/${comment.user.image}`}
                    alt={`${comment.user.name} image`}
                    width={300}
                    height={300}
                    className="bg-cover object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex text-xl gap-2">
                    <p>{comment.user.name}</p>
                  </div>
                  <p className="text-sm font-light text-gray-white">
                    {comment.user.class}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-xl font-light px-12 h-fit border-b border-gray-white mx-4 pb-6">
              {comment.content}
            </div>
          </div>
        );
      })}
      <div className="p-4 border-t border-smoky-black flex gap-4 w-full justify-start items-center">
        <div className="rounded-full border border-smoky-black aspect-square w-12 overflow-hidden bg-alabaster cursor-pointer">
          <Image
            width={300}
            height={300}
            src={`/api/image/${user.image}`}
            alt={`${user.name}-comment-image`}
            className="bg-cover object-cover w-full h-full"
          />
        </div>
        <form action={formAcrion} className="w-full relative">
          <input
            required
            type="text"
            name="comment"
            placeholder="Add a comment"
            className="w-full h-12 border border-smoky-black rounded-full px-4 text-xl outline-none font-light"
          />
          <button
            type="submit"
            className="absolute top-1/2 -translate-y-1/2 right-4 aspect-square w-7 h-auto bg-orange hover:bg-[#F2A685] ease-in-out duration-300 rounded-full flex justify-center items-center text-alabaster"
          >
            <MdOutlineArrowUpward />
          </button>
        </form>
      </div>
    </div>
  );
};
