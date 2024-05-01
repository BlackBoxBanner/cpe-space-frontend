"use server"

import { ReturnResponse } from "@/types/ResponseType";
import { UserType } from "@/types/zodSchema";
import { axios } from "@/libs/axiosInstance";
import { encrypt } from "@/libs/utils/encryption";

type ChangePassword = (
  props: Pick<UserType, "studentid" | "password"> & {
    publicKey: string;
  },
) => Promise<ReturnResponse<string>>;

export const changePassword: ChangePassword = async ({
  studentid,
  password,
  publicKey,
}) => {

  console.log({ studentid, password, publicKey });

  try {
    const res = await axios.post<ReturnResponse<string>>("api/auth/change-password", {
      data: encrypt(
        {
          studentid,
          password,
        },
        publicKey,
      ),
    });
    return res.data;
  } catch (error: any) {
    return error.response.data as ReturnResponse<string>;
  }
};
