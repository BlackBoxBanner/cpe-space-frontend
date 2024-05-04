import { cookies } from 'next/headers';

export const signout = async () => {
  const cookieStore = cookies();

  cookieStore.delete('cpe_space_session');
  cookieStore.delete('user-id');
};
