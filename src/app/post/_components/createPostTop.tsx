'use client';

import Image from 'next/image';
import { BiImage } from 'react-icons/bi';
import { TextArea } from './customTextArea';
import { z } from 'zod';
import { UserSchema } from '@/types/zodSchema';
import { useCreatePostContext } from './context';

type UserType = z.infer<typeof UserSchema>;
const CreatePostTopPart = ({ user }: { user: Omit<UserType, 'password'> }) => {
  const firstName = user.name.split(' ')[0];
  const lastName = user.name.split(' ')[1];

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="rounded-full aspect-square w-11 h-11 overflow-hidden bg-alabaster border border-[#0D0D0D]">
            <Image
              width={300}
              height={300}
              src={`/api/image/${user.image}`}
              alt={user.studentid}
            />
          </div>
          <div className="text-2xl ml-3">
            {firstName} {lastName[0]}
          </div>
        </div>
        <label htmlFor="image-create-post">
          <div className="cursor-pointer">
            <BiImage size={38} />
          </div>
        </label>
        <input
          type="file"
          name="image"
          accept="image/*"
          id="image-create-post"
          className="hidden absolute"
        />
      </div>
      <TextArea />
    </div>
  );
};
export default CreatePostTopPart;
