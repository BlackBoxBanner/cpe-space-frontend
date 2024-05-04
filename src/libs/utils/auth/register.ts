import { ReturnResponse } from '@/types/ResponseType';
import { axios } from '@/libs/axiosInstance';
import { encrypt } from '@/libs/utils/encryption';
import { z } from 'zod';
import { UserSchema } from '@/types/zodSchema';

const UserFormSchema = UserSchema.omit({
  id: true,
  touched: true,
  role: true,
});

type UserFormType = z.infer<typeof UserFormSchema>;

export type RegisterProps = UserFormType & {
  confirmPassword: string;
  publicKey: string;
};

type Register = (props: RegisterProps) => Promise<ReturnResponse<string>>;

export const register: Register = async ({
  confirmPassword,
  password,
  studentid,
  program,
  name,
  phone,
  image,
  email,
  class: _class,
  publicKey,
}) => {
  try {
    const res = await axios.post<ReturnResponse<string>>('api/auth/register', {
      data: encrypt(
        {
          password,
          studentid,
          confirmPassword,
          program,
          name,
          phone,
          email,
          image,
          class: _class,
        },
        publicKey,
      ),
    });
    return res.data;
  } catch (error: any) {
    return error.response.data as ReturnResponse<string>;
  }
};
