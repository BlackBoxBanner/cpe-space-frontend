import CreatePost from './_components/createpost';
import PostBox from './_components/mainpostbox.tsx/postbox';
export default async function Home() {

  return (
    <div className="flex flex-col gap-6">
      <CreatePost />
      <hr className="my-2 border-t border-gray" />
      <PostBox />
    </div>
  );
}
