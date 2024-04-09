"use client"

import {UserType} from "@/types/zodSchema";
import {axios} from "@/lib/axiosInstance";
import {ReturnResponse} from "@/types/ResponseType";
import {encrypt} from "@/lib/utils/encryption";

type SigninProps = Pick<UserType, "studentid" | "password"> & { publicKey: string }

type Signin = (props: SigninProps) => Promise<ReturnResponse<string>>

export const signin: Signin = async ({password, studentid, publicKey}) => {
  try {
    const res = await axios.post<ReturnResponse<string>>("api/auth/signin", {
      data: encrypt({password, studentid}, publicKey)
    })
    return res.data
  } catch (error: any) {
    return error.response.data as ReturnResponse<string>
  }
}