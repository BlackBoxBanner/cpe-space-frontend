import { PostType } from '@/components/common/post';
import { axios } from '@/libs/axiosInstance';
import { ReturnResponse } from '@/types/ResponseType';
import {
  CommentSchema,
  CommunitiesSchema,
  PostSchema,
  TopicSchema,
  UserSchema,
} from '@/types/zodSchema';
import { z } from 'zod';

type TopicType = z.infer<typeof TopicSchema>;

type GetTopicsProps = Partial<TopicType>;

export type TopicsType = z.infer<typeof TopicSchema> & { posts: PostType[] };

export const getTopics = async (props: GetTopicsProps) => {
  try {
    const res = await axios.get<
      TopicType[],
      ReturnResponse<{ data: TopicType[] }>
    >('api/topic', {
      params: props,
    });

    return res.data?.data;
  } catch (error: any) {
    return error.response.data as TopicType[];
  }
};

export const createTopic = async (props: Pick<TopicType, 'name'>) => {
  try {
    const res = await axios.post<TopicType, ReturnResponse<TopicType>>(
      'api/topic',
      {
        data: props,
      },
    );
    return res;
  } catch (error: any) {
    return error.response.data as ReturnResponse<TopicType>;
  }
};

type TopicPost = TopicType & {
  post: z.infer<typeof PostSchema>[];
};

export const getTopicsPost = async (id: string) => {
  try {
    const res = await axios.get<
      TopicPost,
      ReturnResponse<{ data: TopicsType[] }>
    >('api/topic/post', {
      params: {
        id,
      },
    });

    return res.data?.data;
  } catch (error: any) {
    return error.response.data as TopicsType[];
  }
};
