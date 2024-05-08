import CreatePostTopPart from './_components/createPostTop';
import TagOfCreatePost from './_components/tagOfCreatePost';

const CreatePostPage = async () => {
  return (
    <div>
      <div className="flex justify-center">
        <div className="text-[3.5rem] font-bold font-decorate">Create post</div>
      </div>
      <form className="bg-white w-full p-4 rounded-xl border border-smoky-black mt-6">
        <div>
          <CreatePostTopPart />
          <hr className="my-2 border-t border-gray" />
          <TagOfCreatePost />
        </div>
      </form>
    </div>
  );
};

export default CreatePostPage;
