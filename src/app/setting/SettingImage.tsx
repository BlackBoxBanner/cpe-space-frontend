'use client';

import Image from 'next/image';
import { cookies } from 'next/headers';
import { getUsers } from '@/libs/utils/users';
import { BiCamera } from 'react-icons/bi';
import { UserSchema } from '@/types/zodSchema';
import { z } from 'zod';
import { deleteImage } from '@/libs/utils/image/delete';
import { upload } from '@/libs/utils/image/upload';
import { fileExtension } from '@/libs/utils/fileExtension';

type UserType = z.infer<typeof UserSchema>;

const SettingImage = async ({ user }: { user: Omit<UserType, 'password'> }) => {
  const clientAction = async (formData: FormData) => {
    const image = formData.get('image') as File;

    if (!image) return;

    await deleteImage(user.image);

    await upload(
      image,
      `profile/${user.studentid}.${fileExtension(image.name)}`,
    );
  };
  return (
    <div>
      <div className="bg-smoky-black h-[92vh] rounded-xl overflow-hidden m-8 border border-smoky-black relative">
        <Image
          className=""
          width={3000}
          height={3000}
          src={`/api/image/${user.image}`}
          alt={user.studentid}
        />
        <label
          htmlFor="image-community-create-input"
          className="absolute bottom-4 right-4 bg-liberty aspect-square w-16 flex justify-center items-center cursor-pointer rounded-full"
        >
          <BiCamera size={30} className="text-white text-xl" />
        </label>
      </div>
      <form>
        <input
          type="file"
          name="image"
          accept="image/*"
          id="image-setting-update"
          className="hidden absolute"
        />
      </form>
    </div>
  );
};

export default SettingImage;
