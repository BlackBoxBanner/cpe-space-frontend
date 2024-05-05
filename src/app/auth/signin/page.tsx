import { cn } from '@dookdiks/utils';
import { SigninForm } from '@/app/auth/_component/signinForm';
import { getResKey } from '@/libs/utils/encryption/publicKey';
import { axios } from '@/libs/axiosInstance';
import { UserSchema } from '@/types/zodSchema';
import { z } from 'zod';

type UserType = z.infer<typeof UserSchema>;

const SignInPage = async () => {
  const rsaKey = await getResKey();
  const users = await axios.get<{ data: UserType[] }>('/api/user', {});

  const studentIds = users.data.data.map(user => user.studentid);

  return (
    <>
      <div
        className={cn(
          'lg:w-[41rem] text-[3.75rem] font-semibold flex items-center min-h-52 w-auto',
        )}
      >
        Log in
      </div>
      <SigninForm rsaKey={rsaKey.publicKey} studentid={studentIds} />
    </>
  );
};

export default SignInPage;
