import SettingImage from '../../profile/[id]/settingImage';
import UserInfoSetting from '../../profile/[id]/userInfoProfile';
import { cookies } from 'next/headers';
import { getUsers } from '@/libs/utils/users/get';

const UserSettingPage = async () => {
    const cookieStore = cookies();

    const userId = await cookieStore.get('user-id');

    if (!userId) return;

    const user = await getUsers({ id: userId.value });

    if (user.error) throw new Error('unable to get image');

  return (
    <div className="bg-alabaster h-screen grid grid-cols-2 gap-4">
      <SettingImage/>
      <UserInfoSetting
      header='First name'
      user={user.data[0].name}/>
    </div>
  );
};

export default UserSettingPage;
