"use client"

import axios from "axios";
import { ReturnResponse } from "@/types/ResponseType";

type SignOut<T = ReturnResponse<string> | void> = () => Promise<T>

export const signout: SignOut = async () => {
  try {
    await axios.post<ReturnResponse<string>>("api/auth/signout")
  } catch (error: any) {
    return error.response.data as ReturnResponse<string>
  }
}