import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const ProfilesPage = () => {
  const cookieStore = cookies();

  const userId = cookieStore.get('user-id');

  if (!userId) return redirect('/');

  return redirect(`/profile/${userId.value}`);
};

export default ProfilesPage;
