"use client";

import { UserType } from "@/types/zodSchema";
import { axios } from "@/libs/axiosInstance";
import { ReturnResponse } from "@/types/ResponseType";
import { encrypt } from "@/libs/utils/encryption";

type SigninProps = Pick<UserType, "studentid" | "password"> & {
  publicKey: string;
};

type SigninHandler<J = SigninProps, T = ReturnResponse<string> | void> = (
  props: J,
) => Promise<T>;

export const signin: SigninHandler<SigninProps> = async ({
  password,
  studentid,
  publicKey,
}) => {
  try {
    await axios.post("/api/auth/signin", {
      data: encrypt({ password, studentid }, publicKey),
    });
  } catch (error: any) {
    return error.response?.data as ReturnResponse<string>;
  }
};
