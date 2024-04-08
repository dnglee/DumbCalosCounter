import axios, { AxiosResponse } from 'axios';
import FoodToAdd from '../models/IAddFoods';

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


export async function addFood(foodToAdd: FoodToAdd): Promise<any>{
    try {
            const response: AxiosResponse = await axios.post('http://localhost:8080/api/addFoods/', foodToAdd);
            console.log("Food sent: ", response.data);
            return response.data;
        } 
    catch (error) {
            console.log("Axios fetch data: ", error);
        }
}