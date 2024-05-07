import UserInfoSetting from './userInfoSetting';
import SettingImage from './SettingImage';
import { cookies } from 'next/headers';
import { getUsers } from '@/libs/utils/users';

const UserSettingPage = async () => {
  const cookieStore = cookies();

  const userId = await cookieStore.get('user-id');

  if (!userId) return;

  const user = await getUsers({ id: userId.value });

  if (user.error || user.data.length == 0)
    throw new Error('unable to get image');

  const userData = user.data[0];

  return (
    <div className="bg-alabaster h-screen grid grid-cols-2 gap-4">
      <SettingImage user={userData} />
      <UserInfoSetting header="First name" user={user.data[0].name} />
    </div>
  );
};

export default UserSettingPage;
