import axios from 'axios';
import { env } from '@/libs/env';

const instance = axios.create({
  baseURL: `${env.BACKEND_URL}`,
  headers: {
    Authorization: `Bearer ${env.API_TOKEN}`,
  },
});

export { instance as axios };
