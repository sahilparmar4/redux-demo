import { axiosClient } from "./apiClient";

export function getUser(data){
    return axiosClient.get(process.env.REACT_APP_API_URL, data).then((response)=>{
        return response;
    });
}