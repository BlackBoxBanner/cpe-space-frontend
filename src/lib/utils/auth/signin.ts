"use client"

import { UserType } from "@/types/zodSchema";
import { axios as axiosInstance } from "@/lib/axiosInstance";
import axios from "axios";
import { ReturnResponse } from "@/types/ResponseType";
import { encrypt } from "@/lib/utils/encryption";

type SigninProps = Pick<UserType, "studentid" | "password"> & { publicKey: string }

type SigninHandler<J = SigninProps, T = ReturnResponse<string> | void> = (props: J) => Promise<T>

export const signin: SigninHandler<SigninProps> = async ({ password, studentid, publicKey }) => {
  try {
    await axios.post("/api/auth/signin", {
      data: encrypt({ password, studentid }, publicKey)
    })
  } catch (error: any) {
    return error.response?.data as ReturnResponse<string>
  }
}