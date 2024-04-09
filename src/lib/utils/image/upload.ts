"use client"

import { axios } from "@/lib/axiosInstance";
import { ReturnResponse } from "@/types/ResponseType";
import { getBase64 } from "@/lib/utils/base64";
import { isAxiosError } from "axios";

type Upload = (file: File, name?: string) => Promise<ReturnResponse<string>>

export const upload: Upload = async (file, name = file.name) => {
  try {
    const res = await axios.post<ReturnResponse<string>>("api/image/upload", {
      name,
      base64: await getBase64(file)
    })
    return res.data
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return error.response?.data
    }
    return { error: { customError: "An error occurred while uploading the image" } }
  }
}