import PostBoxProfile from './postboxprofile';

const PostBoxTop = () => {

  return (
    <>
      <div className="justify-between flex item-center pr-3">
        <PostBoxProfile/>
        <div className="flex gap-2 items-center">
          <div className="bg-white border border-liberty text-liberty content-center text-xs rounded-xl px-3 h-7">
            Internship
          </div>
        </div>
      </div>
    </>
  );
};

export default PostBoxTop;
