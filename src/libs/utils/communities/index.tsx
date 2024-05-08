import { PostType } from '@/components/common/post';
import { axios } from '@/libs/axiosInstance';
import { ReturnResponse } from '@/types/ResponseType';
import {
  CommentSchema,
  CommunitiesSchema,
  CommunitiesUpdateFormSchema,
  PostLikesSchema,
  PostSchema,
  TopicSchema,
  UserSchema,
} from '@/types/zodSchema';
import { z } from 'zod';

type CommunitiesType = z.infer<typeof CommunitiesSchema>;

type GetCommunitiesProps = Partial<
  Pick<CommunitiesType, 'name' | 'status' | 'id'>
>;

export type CommunitiesPostType = z.infer<typeof PostSchema> & PostType;

export const getCommunities = async (props: GetCommunitiesProps) => {
  try {
    const res = await axios.get<
      CommunitiesType[],
      ReturnResponse<{ data: CommunitiesType[] }>
    >('api/communities', {
      params: props,
    });

    return res.data?.data;
  } catch (error: any) {
    return error.response.data as CommunitiesType[];
  }
};

export const CommunitiesFormSchema = CommunitiesSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
});

type CommunitiesFormType = z.infer<typeof CommunitiesFormSchema>;

export const postCommunities = async (props: CommunitiesFormType) => {
  try {
    const res = await axios.post<
      CommunitiesFormType,
      ReturnResponse<CommunitiesType>
    >('api/communities', {
      data: props,
    });
    return res.data;
  } catch (error: any) {
    return error.response.data as CommunitiesType;
  }
};

type CommunitiesUpdateFormType = z.infer<typeof CommunitiesUpdateFormSchema>;

export const updateCommunities = async (props: CommunitiesUpdateFormType) => {
  try {
    const res = await axios.patch<
      CommunitiesUpdateFormType,
      ReturnResponse<CommunitiesType>
    >('api/communities', {
      body: props,
    });
    return res.data;
  } catch (error: any) {
    return error.response.data as CommunitiesType[];
  }
};

export const deleteCommunities = async ({ id }: { id: string }) => {
  try {
    const res = await axios.delete<
      CommunitiesUpdateFormType,
      ReturnResponse<CommunitiesType>
    >(`api/communities/${id}`);
    return res.data;
  } catch (error: any) {
    return error.response.data as CommunitiesType[];
  }
};

export const getCommunitiesPost = async (id: string) => {
  try {
    const res = await axios.get<
      any,
      ReturnResponse<{ data: CommunitiesPostType[] }>
    >('api/communities/post', {
      params: {
        id,
      },
    });

    return res.data?.data;
  } catch (error: any) {
    return error.response.data as CommunitiesPostType[];
  }
};
