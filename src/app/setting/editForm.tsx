'use client';

import { Button } from '@/components/common/button';
import { updateUser } from '@/libs/utils/users';
import { UserSchema } from '@/types/zodSchema';
import { useRef, useState } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import { z } from 'zod';

const SettingContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-[1fr,1fr,4rem] text-2xl font-light h-8">
      {children}
    </div>
  );
};

type UserType = z.infer<typeof UserSchema>;

export const EditFirstNameForm = ({
  user,
}: {
  user: Omit<UserType, 'password'>;
}) => {
  const [isEdit, setIsEdit] = useState(false);

  const toggleEdit = () => {
    setIsEdit(value => !value);
  };

  const clientAction = async (formData: FormData) => {
    const firstName = formData.get('firstName') as string;
    const newData = await updateUser({
      id: user.id,
      name: `${firstName} ${user.name.split(' ')[1]}`,
    });

    if (newData.error) return alert('Error');
    toggleEdit();
  };
  return (
    <>
      <form action={clientAction}>
        <SettingContainer>
          <div>First name</div>
          <input
            name="firstName"
            className="appearance-none bg-transparent ring-0 outline-none"
            defaultValue={user.name.split(' ')[0]}
            disabled={!isEdit}
            required
          />
          {!isEdit ? (
            <button
              type="button"
              onClick={toggleEdit}
              className="flex justify-center items-center"
            >
              <BiEditAlt size={25} className="text-liberty" />
            </button>
          ) : (
            <Button
              type="submit"
              buttonStyle={{ size: 'sm' }}
              className="text-base py-1"
            >
              save
            </Button>
          )}
        </SettingContainer>
      </form>
    </>
  );
};

export const EditLastNameForm = ({
  user,
}: {
  user: Omit<UserType, 'password'>;
}) => {
  const [isEdit, setIsEdit] = useState(false);

  const toggleEdit = () => {
    setIsEdit(value => !value);
  };

  const clientAction = async (formData: FormData) => {
    const lastName = formData.get('lastName') as string;
    const newData = await updateUser({
      id: user.id,
      name: `${user.name.split(' ')[0]} ${lastName}`,
    });

    if (newData.error) return alert('Error');
    toggleEdit();
  };
  return (
    <>
      <form action={clientAction}>
        <SettingContainer>
          <div>Last name</div>
          <input
            name="lastName"
            className="appearance-none bg-transparent ring-0 outline-none"
            defaultValue={user.name.split(' ')[1]}
            disabled={!isEdit}
            required
          />
          {!isEdit ? (
            <button
              type="button"
              onClick={toggleEdit}
              className="flex justify-center items-center"
            >
              <BiEditAlt size={25} className="text-liberty" />
            </button>
          ) : (
            <Button
              type="submit"
              buttonStyle={{ size: 'sm' }}
              className="text-base py-1"
            >
              save
            </Button>
          )}
        </SettingContainer>
      </form>
    </>
  );
};

export const EditStudentIdForm = ({
  user,
}: {
  user: Omit<UserType, 'password'>;
}) => {
  return (
    <>
      <form>
        <SettingContainer>
          <div>Student ID</div>
          <input
            className="appearance-none bg-transparent ring-0 outline-none"
            defaultValue={user.studentid}
            disabled={true}
          />
        </SettingContainer>
      </form>
    </>
  );
};

export const EditClassForm = ({
  user,
}: {
  user: Omit<UserType, 'password'>;
}) => {
  return (
    <>
      <form>
        <SettingContainer>
          <div>Class</div>
          <input
            className="appearance-none bg-transparent ring-0 outline-none"
            defaultValue={user.class}
            disabled={false}
          />
        </SettingContainer>
      </form>
    </>
  );
};

export const EditEmailForm = ({
  user,
}: {
  user: Omit<UserType, 'password'>;
}) => {
  const [isEdit, setIsEdit] = useState(false);

  const toggleEdit = () => {
    setIsEdit(value => !value);
  };

  const clientAction = async (formData: FormData) => {
    const email = formData.get('email') as string;
    const newData = await updateUser({
      id: user.id,
      email,
    });

    if (newData.error) return alert('Error');
    toggleEdit();
  };
  return (
    <>
      <form action={clientAction}>
        <SettingContainer>
          <div>Email address</div>
          <input
            type="email"
            name="email"
            className="appearance-none bg-transparent ring-0 outline-none"
            defaultValue={user.email}
            disabled={!isEdit}
            required
          />
          {!isEdit ? (
            <button
              type="button"
              onClick={toggleEdit}
              className="flex justify-center items-center"
            >
              <BiEditAlt size={25} className="text-liberty" />
            </button>
          ) : (
            <Button
              type="submit"
              buttonStyle={{ size: 'sm' }}
              className="text-base py-1"
            >
              save
            </Button>
          )}
        </SettingContainer>
      </form>
    </>
  );
};
