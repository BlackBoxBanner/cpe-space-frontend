import { axios } from '@/libs/axiosInstance';
import { ReturnResponse } from '@/types/ResponseType';
import { encrypt } from '@/libs/utils/encryption';
import { z } from 'zod';
import { UserSchema } from '@/types/zodSchema';

type UserType = z.infer<typeof UserSchema>;

type CheckPasswordProps = Pick<UserType, 'studentid' | 'password'> & {
  publicKey: string;
};

type CheckPasswordHandler<
  J = CheckPasswordProps,
  T = ReturnResponse<string>,
> = (props: J) => Promise<T>;

export const checkPassword: CheckPasswordHandler<CheckPasswordProps> = async ({
  password,
  studentid,
  publicKey,
}) => {
  try {
    const res = await axios.post('/api/auth/check-password', {
      data: encrypt({ password, studentid }, publicKey),
    });

    return res.data as ReturnResponse<string>;
  } catch (error: any) {
    return error.response?.data as ReturnResponse<string>;
  }
};
