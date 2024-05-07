'use client';

import Image from 'next/image';
import { cookies } from 'next/headers';
import { getUsers, updateUser } from '@/libs/utils/users';
import { BiCamera } from 'react-icons/bi';
import { UserSchema } from '@/types/zodSchema';
import { z } from 'zod';
import { deleteImage } from '@/libs/utils/image/delete';
import { upload } from '@/libs/utils/image/upload';
import { fileExtension } from '@/libs/utils/fileExtension';
import { ChangeEvent, useState } from 'react';

type UserType = z.infer<typeof UserSchema>;

const SettingImage = async ({ user }: { user: Omit<UserType, 'password'> }) => {
  const [image, setImage] = useState<string>(user.image);

  const onImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const image = e.target.files?.[0] as File;

    if (!image) return;

    await deleteImage(user.image);

    await upload(
      image,
      `profile/${user.studentid}.${fileExtension(image.name)}`,
    );

    await updateUser({
      id: user.id,
      image: `profile/${user.studentid}.${fileExtension(image.name)}`,
    });

    setImage(`profile/${user.studentid}.${fileExtension(image.name)}`);
  };
  return (
    <div>
      <div className="bg-smoky-black h-[92vh] rounded-xl overflow-hidden m-8 border border-smoky-black relative">
        <Image
          className="bg-cover object-cover w-full h-full"
          width={3000}
          height={3000}
          src={`/api/image/${image}`}
          alt={user.studentid}
        />
        <label
          htmlFor="image-setting-update"
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
          onChange={onImageChange}
        />
      </form>
    </div>
  );
};

export default SettingImage;
