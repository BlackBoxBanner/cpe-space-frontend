'use client';

import Image from 'next/image';
import commuimage from '@/assets/welcome/communityDefault.png';
import { BiCamera } from 'react-icons/bi';
import { Button } from '@/components/common/button';
import { useState } from 'react';
import { getBase64 } from '@/libs/utils/base64';
import { postCommunities } from '@/libs/utils/communities';
import { upload } from '@/libs/utils/image/upload';
import { fileExtension } from '@/libs/utils/fileExtension';
import { useRouter } from 'next/navigation';

const CommunityCreateForm = () => {
  const [image, setImage] = useState<string>();

  const router = useRouter();

  const clientAction = async (formData: FormData) => {
    const name = formData.get('name') as string;
    const image = formData.get('image') as File;

    if (!!image.size) {
      const imageData = await upload(
        image,
        `community/${name}_${image.size}.${fileExtension(image.name)}`,
      );

      if (imageData.error) {
        alert('Error - Image not uploaded');
        return;
      }

      const resCommunity = await postCommunities({
        name: name,
        status: 'PUBLIC',
        image: `community/${name}_${image.size}.${fileExtension(image.name)}`,
      });

      if (!resCommunity) {
        return alert('Error - Community not created');
      }

      router.push(`/community/${resCommunity.id}`);
    } else {
      const resCommunity = await postCommunities({
        name: name,
        status: 'PUBLIC',
        image: '',
      });

      if (!resCommunity) {
        return alert('Error - Community not created');
      }

      router.push(`/community/${resCommunity.id}`);
    }
  };

  return (
    <form action={clientAction} className="flex flex-col gap-6">
      <input
        type="text"
        className="bg-white border border-[#0D0D0D] rounded-3xl p-4 px-6 py-6 placeholder:text-gray-white flex outline-none w-full text-3xl font-light"
        placeholder="Community name"
        name="name"
        required
      />
      <div className="relative w-full h-auto">
        <div className="w-full h-80 overflow-hidden aspect-square rounded-3xl bg-liberty flex justify-center items-center">
          <Image
            src={image ? image : commuimage}
            width={3000}
            height={3000}
            alt=""
            className="object-cover"
          />
        </div>
        <label
          htmlFor="image-community-create-input"
          className="absolute bottom-4 right-4 bg-liberty aspect-square w-16 flex justify-center items-center cursor-pointer rounded-full"
        >
          <BiCamera size={30} className="text-white text-xl" />
        </label>
        <input
          type="file"
          name="image"
          accept="image/*"
          id="image-community-create-input"
          className="hidden absolute"
          onChange={async e => {
            const data = e.target.files?.[0];
            if (!data) return;
            const base64 = await getBase64(data);
            setImage(base64);
          }}
        />
      </div>
      <div className="w-full flex justify-end">
        <Button
          type="submit"
          buttonStyle={{}}
          className="rounded-full w-fit text-xl min-w-40 font-light"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default CommunityCreateForm;
