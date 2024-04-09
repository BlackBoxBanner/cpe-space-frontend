"use client"

import {axios} from "@/lib/axiosInstance";
import {ReturnResponse} from "@/types/ResponseType";

type SignOut = () => Promise<ReturnResponse<string>>

export const signout: SignOut = async () => {
  try {
    const res = await axios.post<ReturnResponse<string>>("api/auth/signout")
    return res.data
  } catch (error: any) {
    return error.response.data as ReturnResponse<string>
  }
}