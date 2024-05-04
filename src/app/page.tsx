import { Button, Link } from '@/components/common/button';
import { axios } from '@/libs/axiosInstance';
import { signout } from '@/libs/utils/auth/signout';
import { redirect } from 'next/navigation';
import CreatePost from './_components/createpost';
import PostBox from './_components/postbox';
export default async function Home() {

  const formAction = async (formData: FormData) => {
    'use server';

    const studentid = formData.get('studentid');
    try {
      const token = await axios.post('api/auth/change-password-ticket', {
        data: studentid,
      });
      console.log(token.data);
    } catch (error) {
      console.log(error);
    }
  };

  const signOutFormAction = async (formData: FormData) => {
    'use server';
    await signout();
    redirect('/');
  };
  return (
    <div>
      <CreatePost/>
      <hr className="my-2 border-t border-gray mb-4" />
      <PostBox/>
      <form action={signOutFormAction}>
        <Button type="submit">Signout</Button>
      </form>
    </div>
  );
}
