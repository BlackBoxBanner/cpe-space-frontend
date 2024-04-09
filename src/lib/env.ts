import zod from "zod"

const envSchema = zod.object({
  API_TOKEN: zod.string({ required_error: "The NEXT_PUBLIC_API_TOKEN environment variable is required" }),
  BACKEND_URL: zod.string({ required_error: "The NEXT_PUBLIC_BACKEND_URL environment variable is required" }),
  BACKEND_HOSTNAME: zod.string({ required_error: "The NEXT_PUBLIC_BACKEND_HOSTNAME environment variable is required" }),
})

export const env = envSchema.parse({
  API_TOKEN: process.env.NEXT_PUBLIC_API_TOKEN,
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  BACKEND_HOSTNAME: process.env.NEXT_PUBLIC_BACKEND_HOSTNAME,
})