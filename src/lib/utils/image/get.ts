import { env } from '@/lib/env';

export const imagePath = (path: string) => {
  return `${env.BACKEND_URL}/api/image/get/${path}`
}