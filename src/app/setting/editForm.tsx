'use client';

import { UserSchema } from '@/types/zodSchema';
import { z } from 'zod';

const SettingContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="grid grid-cols-[1fr,auto,1fr]">{children}</div>;
};

type UserType = z.infer<typeof UserSchema>;

export const EditFirstNameForm = ({
  user,
}: {
  user: Omit<UserType, 'password'>;
}) => {
  return (
    <>
      <form>
        <SettingContainer>
          <div>First name</div>
          <div>{user.name.split(' ')[0]}</div>
          <div>s</div>
        </SettingContainer>
      </form>
    </>
  );
};
