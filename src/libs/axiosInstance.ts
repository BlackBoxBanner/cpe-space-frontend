import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5100",
  headers: {
    Authorization: `Bearer ${process.env.API_TOKEN}`
  },
})

export { instance as axios }