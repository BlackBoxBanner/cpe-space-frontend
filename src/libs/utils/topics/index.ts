import { axios } from '@/libs/axiosInstance';
import { ReturnResponse } from '@/types/ResponseType';
import { TopicSchema } from '@/types/zodSchema';
import { z } from 'zod';

type TopicsType = z.infer<typeof TopicSchema>;

type GetTopicsProps = Partial<TopicsType>;

export const getTopics = async (props: GetTopicsProps) => {
  try {
    const res = await axios.get<
      TopicsType[],
      ReturnResponse<{ data: TopicsType[] }>
    >('api/topic', {
      params: props,
    });

    return res.data?.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const createTopic = async (props: Pick<TopicsType, 'name'>) => {
  try {
    const res = await axios.post<TopicsType, ReturnResponse<TopicsType>>(
      'api/topic',
      {
        body: props,
      },
    );
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};
