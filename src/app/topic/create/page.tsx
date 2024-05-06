import { Button } from '@/components/common/button';

const CreateTopic = async () => {
  return (
    <>
      <div className="text-[35px] font-bold mb-4 font-decorate">
        Create topic
      </div>
      <div className="bg-white border border-[#0D0D0D] rounded-2xl p-3 flex">
        <input
          type="text"
          className="outline-none w-full"
          placeholder="New topic"
        />
        <Button
          type="submit"
          className="px-9 h-10 flex items-center justify-center"
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default CreateTopic;
