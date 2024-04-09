import axios from "axios";
import { env } from "@/lib/env"

const instance = axios.create({
  baseURL: `${env.BACKEND_URL}`,
  headers: {
    Authorization: `Bearer ${env.API_TOKEN}`
  },
})

export { instance as axios }