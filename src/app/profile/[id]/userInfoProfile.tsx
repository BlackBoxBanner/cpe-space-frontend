import { z } from 'zod';
import { UserSchema } from '@/types/zodSchema';

export type UserType = z.infer<typeof UserSchema>

export type UserInfoProps = {
    header: string
    user: string
};

const UserInfoProfile = async ({ header, user }: UserInfoProps) => {
    return (
        <div className='grid grid-cols-2 text-xl mx-8'>
            <div className='mb-8'>{header}</div>
            <div>{user}</div>
        </div>
    );
};

export default UserInfoProfile;
