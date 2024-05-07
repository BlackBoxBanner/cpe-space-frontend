import { axios } from '@/libs/axiosInstance';
import { ReturnResponse } from '@/types/ResponseType';
import { UserSchema } from '@/types/zodSchema';
import { z } from 'zod';

type UserType = z.infer<typeof UserSchema>;

type UsersResponse = ReturnResponse<Omit<UserType, 'password'>[]>;

export const getUsers = async (props?: Partial<UserType>) => {
  try {
    const res = await axios.get<UsersResponse>('api/user', {
      params: props,
    });
    return res.data as UsersResponse;
  } catch (error: any) {
    console.log(error);

    return error.response.data as UsersResponse;
  }
};

export const updateUser = async (
  props: Partial<Omit<UserType, 'password'>>,
) => {
  try {
    const res = await axios.patch<ReturnResponse<Omit<UserType, 'password'>>>(
      'api/user',
      {
        data: props,
      },
    );
    return res.data as UsersResponse;
  } catch (error: any) {
    console.log(error);

    return error.response.data as UsersResponse;
  }
};
