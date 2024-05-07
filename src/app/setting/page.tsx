import SettingImage from './SettingImage';
import { cookies } from 'next/headers';
import { getUsers } from '@/libs/utils/users';
import {
  EditClassForm,
  EditEmailForm,
  EditFirstNameForm,
  EditLastNameForm,
  EditStudentIdForm,
} from './editForm';
import { Button } from '@/components/common/button';
import { signout } from '@/libs/utils/auth/signout';
import { redirect } from 'next/navigation';

const UserSettingPage = async () => {
  const cookieStore = cookies();

  const userId = await cookieStore.get('user-id');

  if (!userId) return;

  const user = await getUsers({ id: userId.value });

  if (user.error || user.data.length == 0)
    throw new Error('unable to get image');

  const userData = user.data[0];

  const signOutFormAction = async (formData: FormData) => {
    'use server';
    await signout();
    redirect('/');
  };

  return (
    <div className="bg-alabaster h-screen grid grid-cols-2 gap-4">
      <SettingImage user={userData} />
      <div className="p-8 flex justify-between items-center flex-col">
        <div>
          <div className="flex justify-center text-center w-full text-[4rem]">
            <p>Settings</p>
          </div>
          <div className="flex flex-col gap-6">
            <EditFirstNameForm user={userData} />
            <EditLastNameForm user={userData} />
            <EditStudentIdForm user={userData} />
            <EditClassForm user={userData} />
            <EditEmailForm user={userData} />
          </div>
        </div>
        <form action={signOutFormAction} className="w-full">
          <Button type="submit" buttonStyle={{ widthFull: true }}>
            Sign out
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UserSettingPage;
