'use client';

import { Button } from '@/components/common/button';
import { useRouter } from 'next/navigation';
import { createTopic } from '@/libs/utils/topics';

const TopicCreateForm = () => {
  const router = useRouter();

  const clientAction = async (formData: FormData) => {
    const name = formData.get('name') as string;

    const newTopic = await createTopic({ name });

    if (newTopic.error) {
      return alert(newTopic.error.customError);
    }

    router.push(`/`);
  };

  return (
    <form action={clientAction} className="relative">
      <input
        type="text"
        className="bg-white border border-[#0D0D0D] rounded-3xl p-4 px-6 py-6 placeholder:text-gray-white flex outline-none w-full text-3xl font-light"
        placeholder="New topic"
        name="name"
        required
      />
      <div className="absolute top-1/2 -translate-y-1/2 right-4">
        <Button
          type="submit"
          buttonStyle={{}}
          className="rounded-full w-fit text-xl min-w-36 font-light"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default TopicCreateForm;
