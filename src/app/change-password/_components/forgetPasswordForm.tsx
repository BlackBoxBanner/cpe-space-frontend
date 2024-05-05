'use client';

import { cn } from '@dookdiks/utils';
import { useForm, Controller } from 'react-hook-form';
import zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/common/button';
import { axios } from '@/libs/axiosInstance';
import { ReturnResponse } from '@/types/ResponseType';
import { Input } from '@/app/auth/_component/input';
import { useRouter } from 'next/navigation';

const ChangePasswordSchema = zod.object({
  studentid: zod.string(),
});

type ChangePasswordProps = zod.infer<typeof ChangePasswordSchema>;

const ChangePasswordForm = ({ studentIds }: { studentIds: string[] }) => {
  const router = useRouter();

  const { control, handleSubmit } = useForm<ChangePasswordProps>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const onSubmitHandler = async (data: ChangePasswordProps) => {
    const res = await axios.post('/api/auth/change-password-ticket', {
      data,
    });

    const resData = res.data as ReturnResponse<{ data: string }>;

    if (resData.error) throw new Error(resData.error.customError);

    router.push(`/`);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className={cn('flex flex-col justify-center gap-8')}
      >
        <Controller
          control={control}
          name="studentid"
          render={({ field }) => {
            return (
              <>
                <Input {...field} placeholder="Student ID" />
                <Button
                  type="submit"
                  disabled={studentIds.includes(field.value) ? false : true}
                  buttonStyle={{
                    color: 'orange',
                    size: 'lg',
                  }}
                >
                  Send email
                </Button>
              </>
            );
          }}
        />
      </form>
    </>
  );
};

export default ChangePasswordForm;
