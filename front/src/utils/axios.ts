import axios from "axios";

const server_url=`https://task-4e1n.onrender.com`

export const api=axios.create({
    baseURL:`${server_url}/api/auth/`,
    timeout:7000
})