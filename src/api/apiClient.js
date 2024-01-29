import axios from "axios";

export const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "api_key": "",
        'Accept-Language': "",
        "Content-Type": "",
      },
});

