import { cn } from '@dookdiks/utils';
import ChangePasswordForm from './_components/forgetPasswordForm';
import { axios } from '@/libs/axiosInstance';
import { z } from 'zod';
import { UserSchema } from '@/types/zodSchema';

type UserType = z.infer<typeof UserSchema>;

const ChangePasswordPage = async () => {
  const users = await axios.get<{ data: UserType[] }>('/api/user', {});

  const studentIds = users.data.data.map(user => user.studentid);

  return (
    <>
      <div
        className={cn(
          'w-[41rem] text-[3.75rem] font-semibold flex min-h-52 flex-col justify-center',
        )}
      >
        <div>Forgot password</div>
        <div className={cn('text-[1.75rem] font-light')}>
          <p>No worries. Enter your student ID and we will</p>
          <p>share a reset link to your @kmutt.ac.th</p>
        </div>
      </div>
      <ChangePasswordForm studentIds={studentIds} />
    </>
  );
};

export default ChangePasswordPage;
