import { axios } from "@/libs/axiosInstance"
import { ReturnResponse } from "@/types/ResponseType"
import { UserType } from "@/types/zodSchema"


type UserResponse = ReturnResponse<Omit<UserType, "password">>
type UsersResponse = ReturnResponse<Omit<UserType, "password">[]>

export const getUsers = async () => {
  try {
    const res = await axios.get<UsersResponse>("api/user")
    return res.data as UsersResponse
  } catch (error: any) {
    return error.response.data as UsersResponse
  }
}

export const getUserById = async (id: string) => {
  try {
    const res = await axios.get<UserResponse>("api/user", { params: { id } })
    return res.data as UserResponse
  } catch (error: any) {
    return error.response.data as UserResponse
  }
}

export const getUserByStudentId = async (id: string) => {
  try {
    const res = await axios.get<UserResponse>("api/user", { params: { studentid: id } })
    return res.data as UserResponse
  } catch (error: any) {
    return error.response.data as UserResponse
  }
}