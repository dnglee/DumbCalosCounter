import axios, { AxiosResponse } from 'axios';

export async function fetchAllCalos(): Promise<any>{
    try {
            const response: AxiosResponse = await axios.get('http://localhost:8080/api/foods/');
            console.log(response.data);
            return response.data;
        } 
    catch (error) {
            console.log("Axios fetch data: ", error);
        }
}