import CreatePostTopPart from './createPostTop';
import TagOfCreatePost from './tagOfCreatePost';

const CreatePostPage = async () => {
    return (

        <div>
            <div className="flex justify-center">
                <div className="text-5xl font-bold font-decorate">Create post</div>
            </div>
            <div className="bg-white w-full p-4 rounded-xl border border-smoky-black mt-6">
                <div>
                <CreatePostTopPart />
                <hr className="my-2 border-t border-gray" />
                <TagOfCreatePost/>
                </div>
            </div>

        </div>
    )
}

export default CreatePostPage;