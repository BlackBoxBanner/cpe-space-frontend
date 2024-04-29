"use client";

import { UserType } from "@/types/zodSchema";
import axios from "axios";
import { axios as axiosInstance } from "@/libs/axiosInstance";
import { ReturnResponse } from "@/types/ResponseType";
import { encrypt } from "@/libs/utils/encryption";

export type SigninProps = Pick<UserType, "studentid" | "password"> & {
  publicKey: string;
};

export type SigninPropsServer = {
  data: string;
}

export const signinNext = async ({
  password,
  studentid,
  publicKey,
}: SigninProps) => {
  try {

    const res = await fetch("/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: encrypt({ password, studentid }, publicKey) }),
    })

    // if (res.status != 200) throw new Error(res.json());

    return res.json();

  } catch (error: any) {
    return error.response?.data
  }
};


