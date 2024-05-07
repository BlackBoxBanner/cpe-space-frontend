import { cookies } from 'next/headers';
import { getUsers } from '@/libs/utils/users';
import ProfileImage from './ProfileImage';
import UserInfoProfile from './userInfoProfile';

const UserProfilePage = async ({ params }: { params: { id: string } }) => {
  const user = await getUsers({ id: params.id });

  console.log(user);

  if (user.error || user.data.length == 0) throw new Error('No user found');

  const firstName = user.data[0].name.split(' ')[0];
  const lastName = user.data[0].name.split(' ')[1];

  return (
    <div className="bg-alabaster h-screen grid grid-cols-2 gap-4">
      <ProfileImage />
      <div>
        <div className="flex justify-center m-8 mt-3">
          <div className="font-decorate font-bold text-[60px]">Greeting</div>
        </div>
        <UserInfoProfile header="First name" user={firstName} />
        <UserInfoProfile header="Last name" user={lastName} />
        <UserInfoProfile header="Role" user={user.data[0].role} />
        <UserInfoProfile header="Email address" user={user.data[0].email} />
      </div>
    </div>
  );
};

export default UserProfilePage;
