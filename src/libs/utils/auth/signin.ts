import { encrypt } from '@/libs/utils/encryption';
import { z } from 'zod';
import { UserSchema } from '@/types/zodSchema';
import { signInAction } from '@/action/auth';

type UserType = z.infer<typeof UserSchema>;

export type SigninProps = Pick<UserType, 'studentid' | 'password'> & {
  publicKey: string;
};

export type SigninPropsServer = {
  data: string;
};

export const signinNext = async ({
  password,
  studentid,
  publicKey,
}: SigninProps) => {
  const signinRes = await signInAction(
    encrypt({ password, studentid }, publicKey),
  );

  return signinRes;
};
