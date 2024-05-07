import TopicCreateForm from './_components/topicCreateForm';

const CreateTopic = async () => {
  return (
    <>
      <div className="text-6xl font-bold mb-4 font-decorate">Create topic</div>
      <TopicCreateForm />
    </>
  );
};

export default CreateTopic;
