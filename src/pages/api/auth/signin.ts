import { axios } from "@/lib/axiosInstance";
import { ReturnResponse } from "@/types/ResponseType";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const signinResponse = await axios.post<ReturnResponse<string>>("api/auth/signin", {
        data: req.body
      })

      if (signinResponse.data.error) return res.status(403).json(signinResponse.data)

      const signinHeader = signinResponse.headers

      const cookie = signinHeader["set-cookie"]

      cookie ? res.setHeader("Set-Cookie", cookie) : res.setHeader("Set-Cookie", [])

      return res.status(200).json(signinResponse.data)
    } catch (error: any) {
      if (error.response?.data) return res.status(403).json(error.response.data)
      return res.status(500).json({ error: { customError: "Internal Error" } })
    }
  }
}
