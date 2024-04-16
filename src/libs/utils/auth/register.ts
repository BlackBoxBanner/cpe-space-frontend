import { ReturnResponse } from "@/types/ResponseType";
import { UserFormType } from "@/types/zodSchema";
import { axios } from "@/libs/axiosInstance";
import { encrypt } from "@/libs/utils/encryption";

type Register = (
  props: UserFormType & {
    confirmPassword: string;
    publicKey: string;
  },
) => Promise<ReturnResponse<string>>;

export const register: Register = async ({
  confirmPassword,
  password,
  studentid,
  program,
  name,
  phone,
  image,
  email,
  publicKey,
}) => {
  try {
    const res = await axios.post<ReturnResponse<string>>("api/auth/register", {
      data: encrypt(
        {
          password,
          studentid,
          confirmPassword,
          program,
          name,
          phone,
          email,
          image,
        },
        publicKey,
      ),
    });
    return res.data;
  } catch (error: any) {
    return error.response.data as ReturnResponse<string>;
  }
};
