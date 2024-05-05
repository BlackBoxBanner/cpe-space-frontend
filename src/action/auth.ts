'use server';

import { axios } from '@/libs/axiosInstance';
import { ReturnResponse } from '@/types/ResponseType';
import { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { RegisterProps, register } from '@/libs/utils/auth/register';
import { getResKey } from '@/libs/utils/encryption/publicKey';

export const signInAction = async (data: string) => {
  try {
    const res = await axios.post<
      ReturnResponse<{ session: string; userId: string }>
    >('/api/auth/signin', {
      data,
    });

    if (res.data.error) throw new Error(res.data.error.customError);

    const cookieStore = cookies();

    cookieStore.set('cpe_space_session', res.data.data.session);
    cookieStore.set('user-id', res.data.data.userId);

    return res.data;
  } catch (error: unknown) {
    const err = error as AxiosError<
      ReturnResponse<{ session: string; userId: string }>
    >;
    return err.response?.data;
  }
};

export const registerAction = async (formData: FormData, image: string) => {
  const data: RegisterProps = {
    confirmPassword: formData.get('studentid') as string,
    password: formData.get('studentid') as string,
    studentid: formData.get('studentid') as string,
    program: formData.get('program') as
      | 'REGULAR'
      | 'INTERNATIONAL'
      | 'HEALTH_DATA_SCIENCE'
      | 'RESFENTIAL_COLLEGE',
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    publicKey: (await getResKey()).publicKey,
    class: formData.get('class') as string,
    image: image,
  };

  const res = await register(data);

  return !res.error;
};
