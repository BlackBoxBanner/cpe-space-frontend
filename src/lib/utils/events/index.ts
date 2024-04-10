"use client"

import { axios } from "@/lib/axiosInstance";
import { ReturnResponse } from "@/types/ResponseType";
import { EventType } from "@/types/zodSchema";

type GetMenyEvents<T = ReturnResponse<EventType>> = () => Promise<T>

export const getMenyEvents: GetMenyEvents = async () => {
  try {
    const { data } = await axios.get<ReturnResponse<EventType>>("/api/event");
    if (data.error) throw new Error(data.error.customError)
    return { data: data.data }
  } catch (error: any) {
    return error.response.data as ReturnResponse<EventType>
  }
}
