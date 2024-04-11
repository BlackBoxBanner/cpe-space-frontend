"use client"

import { axios } from "@/lib/axiosInstance";
import { ReturnResponse } from "@/types/ResponseType";
import { EventPostType } from "@/types/zodSchema";

type GetMenyPostEvents<T = ReturnResponse<EventPostType[]>> = () => Promise<T>

export const getMenyPostEvents: GetMenyPostEvents = async () => {
  try {
    const { data } = await axios.get<ReturnResponse<EventPostType[]>>("/api/event/post");
    if (data.error) throw new Error(data.error.customError)
    return { data: data.data }
  } catch (error: any) {
    return error.response.data as ReturnResponse<EventPostType[]>
  }
}

type GetPostEvent<T = ReturnResponse<EventPostType>> = (id: string) => Promise<T>

export const getPostEvent: GetPostEvent = async (id) => {
  try {
    const { data } = await axios.get<ReturnResponse<EventPostType>>(`/api/event/post/${id}`);
    if (data.error) throw new Error(data.error.customError)
    return { data: data.data }
  } catch (error: any) {
    return error.response.data as ReturnResponse<EventPostType>
  }
}

type PatchPostEvent<T = ReturnResponse<EventPostType>> = (id: string, body: Partial<EventPostType>) => Promise<T>

export const patchPostEvent: PatchPostEvent = async (id, body) => {
  try {
    const { data } = await axios.patch<ReturnResponse<EventPostType>>(`/api/event/post/${id}`, body);
    if (data.error) throw new Error(data.error.customError)
    return { data: data.data }
  } catch (error: any) {
    return error.response.data as ReturnResponse<EventPostType>
  }
}

// delete event

type DeletePostEvent<T = ReturnResponse<EventPostType>> = (id: string) => Promise<T>

export const deletePostEvent: DeletePostEvent = async (id) => {
  try {
    const { data } = await axios.delete<ReturnResponse<EventPostType>>(`/api/event/post/${id}`);
    if (data.error) throw new Error(data.error.customError)
    return { data: data.data }
  } catch (error: any) {
    return error.response.data as ReturnResponse<EventPostType>
  }
}

type PostPostEvent<T = ReturnResponse<EventPostType>> = (body: Omit<EventPostType, "createdAt" | "updatedAt" | "id" | "authorId">) => Promise<T>

export const postPostEvent: PostPostEvent = async (body) => {
  try {
    const { data } = await axios.post<ReturnResponse<EventPostType>>("/api/event/post", body);
    if (data.error) throw new Error(data.error.customError)
    return { data: data.data }
  } catch (error: any) {
    return error.response.data as ReturnResponse<EventPostType>
  }
}