'use client';

import { Button } from '@/components/common/button';
import { Input, Password } from '@/app/auth/_component/input';
import RightArrow from '@/components/icon/rightArrow';
import { useState } from 'react';
import { signinNext } from '@/libs/utils/auth/signin';
import { Controller, useForm } from 'react-hook-form';
import zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type SigninFormProps = {
  rsaKey: string;
  studentid: string[];
};

const SigninSchema = zod.object({
  studentid: zod.string().min(11).max(11),
  password: zod.string(),
});

type SigninProps = zod.infer<typeof SigninSchema>;

export const SigninForm = ({ rsaKey, studentid }: SigninFormProps) => {
  const [page, setPage] = useState(0);

  const routers = useRouter();

  const { control, handleSubmit, setError } = useForm<SigninProps>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      studentid: '',
    },
  });

  const onSignInSubmit = async (data: SigninProps) => {
    const signinRes = await signinNext({
      studentid: data.studentid,
      password: data.password,
      publicKey: rsaKey,
    });

    if (signinRes.error) {
      return setError('password', {
        message: 'Invalid student ID or password',
      });
    }

    routers.push('/');
  };

  const isValidStudentId = (value: string) => {
    return value.length !== 11 || !studentid.includes(value);
  };

  return (
    <form
      className="relative flex justify-center items-center"
      onSubmit={handleSubmit(onSignInSubmit)}
    >
      <IsPage page={page} triggerPage={0}>
        <div className="w-full relative">
          <Controller
            control={control}
            name="studentid"
            render={({
              field: { onChange, ...field },
              fieldState: { error, isDirty },
            }) => (
              <>
                <div className="relative">
                  <Input
                    placeholder="Student ID"
                    error={!!error}
                    id="studentid"
                    onChange={e =>
                      onChange(
                        isNaN(Number(e.target.value)) ||
                          e.target.value.length > 11
                          ? field.value
                          : e.target.value,
                      )
                    }
                    {...field}
                  />
                  <div className="absolute -bottom-10 left-0">
                    {field.value && field.value.length > 0 && (
                      <div className="flex justify-center gap-2 w-full text-nowrap">
                        {isValidStudentId(field.value) &&
                          field.value.length === 11 && (
                            <>
                              <p className="text-error">
                                Looks like you don't have an account.
                              </p>
                              <Link href="/auth/signup" passHref legacyBehavior>
                                <Button
                                  buttonStyle={{
                                    color: 'link',
                                    size: 'link',
                                    underline: true,
                                  }}
                                >
                                  Sign up
                                </Button>
                              </Link>
                            </>
                          )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="absolute -bottom-24 right-0">
                  <Button
                    buttonStyle={{ size: 'circle', color: 'orange' }}
                    onClick={() => setPage(e => e + 1)}
                    type="button"
                    disabled={isValidStudentId(field.value)}
                  >
                    <RightArrow />
                  </Button>
                </div>
              </>
            )}
          />
        </div>
      </IsPage>
      <IsPage page={page} triggerPage={1}>
        <div className="w-full flex flex-col gap-8 relative">
          <Controller
            control={control}
            name="password"
            render={({ field, fieldState: { error } }) => (
              <>
                <div className="relative">
                  <Password
                    placeholder="Password"
                    type="password"
                    id="password"
                    error={!!error}
                    {...field}
                  />
                </div>
              </>
            )}
          />
          <Button buttonStyle={{ size: 'lg' }} type="submit">
            Log in
          </Button>
          <div className="absolute -bottom-8 right-0">
            <Link href="/change-password" passHref legacyBehavior>
              <Button buttonStyle={{ color: 'link', size: 'link' }}>
                Forgot password ?
              </Button>
            </Link>
          </div>
        </div>
      </IsPage>
    </form>
  );
};

type IsPageProps = {
  page: number;
  triggerPage: number;
  children: React.ReactNode;
};

const IsPage = ({ children, page, triggerPage }: IsPageProps) => {
  return page === triggerPage ? <>{children}</> : null;
};
