import { axios } from '@/libs/axiosInstance';
import { env } from '@/libs/env';
import { ReturnResponse } from '@/types/ResponseType';
import { isAxiosError } from 'axios';

type DeleteImage = (path: string) => Promise<ReturnResponse<string>>;

export const deleteImage: DeleteImage = async (path: string) => {
  try {
    const res = await axios.delete<ReturnResponse<string>>(
      `/api/image/delete/${path}`,
    );
    return res.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return error.response?.data;
    }
    return {
      error: { customError: 'An error occurred while uploading the image' },
    };
  }
};
