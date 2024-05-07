import { z } from 'zod';
import { UserSchema } from '@/types/zodSchema';

export type UserType = z.infer<typeof UserSchema>

export type UserInfoProps = {
    header: string
    user: string
};

const UserInfoSetting = async ({ header, user }: UserInfoProps) => {
    return (
        <div>
        <div className='flex justify-center m-8 mt-3'>
            <div className='font-decorate font-bold text-[60px]'>Settings</div>
        </div>
        <div>
            {header}
            {user}
        </div>
        </div>
    );
};

export default UserInfoSetting;
