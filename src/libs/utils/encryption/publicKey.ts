import { axios } from "@/libs/axiosInstance";
import { ReturnResponse } from "@/types/ResponseType";
import { util } from "node-forge";

export const getResKey = async () => {
  const rsaPublicKey = await axios.get<ReturnResponse<string>>(
    "/api/config/rsa-key",
  );

  if (rsaPublicKey.data.error)
    throw new Error(rsaPublicKey.data.error.customError);

  const publicKey = util.decode64(rsaPublicKey.data.data);
  return { publicKey };
};
