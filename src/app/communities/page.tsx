import CommunitiesTopPart from "../_components/communitiestoppart";
import CreatePost from "../_components/createpost";

const Communities = () => {
  return (
    <>
        <CommunitiesTopPart />
        <hr className="border-t border-gray mx-3 my-7" />
        <CreatePost/>
    </>
  );
};

export default Communities;
