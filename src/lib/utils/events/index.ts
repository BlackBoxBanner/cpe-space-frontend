"use client"

import { axios } from "@/lib/axiosInstance";
import { ReturnResponse } from "@/types/ResponseType";
import { EventType } from "@/types/zodSchema";

type GetMenyEvents<T = ReturnResponse<EventType[]>> = () => Promise<T>

export const getMenyEvents: GetMenyEvents = async () => {
  try {
    const { data } = await axios.get<ReturnResponse<EventType[]>>("/api/event");
    if (data.error) throw new Error(data.error.customError)
    return { data: data.data }
  } catch (error: any) {
    return error.response.data as ReturnResponse<EventType[]>
  }
}

type GetEvent<T = ReturnResponse<EventType>> = (id: string) => Promise<T>

export const getEvent: GetEvent = async (id) => {
  try {
    const { data } = await axios.get<ReturnResponse<EventType>>(`/api/event/${id}`);
    if (data.error) throw new Error(data.error.customError)
    return { data: data.data }
  } catch (error: any) {
    return error.response.data as ReturnResponse<EventType>
  }
}

type PatchEvent<T = ReturnResponse<EventType>> = (id: string, body: Partial<EventType>) => Promise<T>

export const patchEvent: PatchEvent = async (id, body) => {
  try {
    const { data } = await axios.patch<ReturnResponse<EventType>>(`/api/event/${id}`, body);
    if (data.error) throw new Error(data.error.customError)
    return { data: data.data }
  } catch (error: any) {
    return error.response.data as ReturnResponse<EventType>
  }
}

// delete event

type DeleteEvent<T = ReturnResponse<EventType>> = (id: string) => Promise<T>

export const deleteEvent: DeleteEvent = async (id) => {
  try {
    const { data } = await axios.delete<ReturnResponse<EventType>>(`/api/event/${id}`);
    if (data.error) throw new Error(data.error.customError)
    return { data: data.data }
  } catch (error: any) {
    return error.response.data as ReturnResponse<EventType>
  }
}