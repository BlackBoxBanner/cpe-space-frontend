import CommunityCreateForm from './_components/communityCreateForm';

const CreateCommunity = () => {
  const formServerAction = async (formData: FormData) => {
    'use server';
  };
  return (
    <>
      <div className="text-6xl font-bold mb-4 font-decorate">
        Create community
      </div>
      <CommunityCreateForm />
    </>
  );
};

export default CreateCommunity;
