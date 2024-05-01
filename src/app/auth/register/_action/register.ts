"use server"

import { RegisterProps, register } from "@/libs/utils/auth/register";
import { getResKey } from "@/libs/utils/encryption/publicKey";

export const registerServerAction = async (formData: FormData) => {
  const data: RegisterProps = {
    confirmPassword: formData.get("studentid") as string,
    password: formData.get("studentid") as string,
    studentid: formData.get("studentid") as string,
    program: formData.get("program") as
      | "REGULAR"
      | "INTERNATIONAL"
      | "HEALTH_DATA_SCIENCE"
      | "RESFENTIAL_COLLEGE",
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    publicKey: (await getResKey()).publicKey,
  };

  const res = await register(data);

  return !res.error

  // if (!res.error) permanentRedirect("/auth/register");
};