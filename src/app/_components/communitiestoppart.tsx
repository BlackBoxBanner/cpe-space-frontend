import Image from "next/image";
import commuimage from '@/assets/welcome/comuphoto.png';
import { cookies } from 'next/headers';
import { getUsers } from '@/libs/utils/users/get';
import { Button } from "@/components/common/button";

const CommunitiesTopPart = async () => {

  const cookieStore = cookies();

  const userId = await cookieStore.get('user-id');

  if (!userId) return;

  const user = await getUsers({ id: userId.value });

  if (user.error) throw new Error('unable to get image');
  return (
    <>
      <div className="flex">
        <div className="relative">
          <Image src={commuimage} width={800} height={230} alt="" className="w-[1100px] h-[160px]" />
          <div className="absolute bottom-3 left-8">
            <div className="font-bold text-[50px] text-yellow-orange ">
              CPE 35
            </div>
          </div>
        </div>
        <div className="w-[250px] h-[160px] bg-white rounded-2xl border border-smoky-black">
          <div className="m-3">
            <div className="flex justify-between">
              <div>Member</div>
              <div>23</div>
            </div>
            <div className="flex justify-between mt-3">
              <div>Owner</div>
              <div>
                <div className="rounded-full aspect-square w-7 h-7 overflow-hidden bg-alabaster">
                  <Image
                    width={300}
                    height={300}
                    src={`/api/image/${user.data[0].image}`}
                    alt={user.data[0].studentid}
                  />
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full bg-liberty hover:bg-[#9EAAC9] border-none h-8 flex items-center justify-center mt-9 rounded-xl">Leave community</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunitiesTopPart;
