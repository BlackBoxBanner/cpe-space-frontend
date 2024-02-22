"use server";

import { axios } from "@/libs/axiosInstance";
import { ReturnResponse } from "@/types/ResponseType";

export const getServerAction = async () => {
  const { data } = await axios.get<ReturnResponse<{ message: string }>>("/");

  return data.data?.message;
};