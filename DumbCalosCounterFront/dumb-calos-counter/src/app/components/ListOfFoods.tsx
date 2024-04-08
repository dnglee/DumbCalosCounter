"use client";
import React, { useEffect, useState } from 'react';
import { fetchAllCalos } from '../services/backendapi';
import Food from '../models/IFood';




const ListOfFoods = () => {
    const [foodsList, setData] = useState<Food[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAllCalos()
            .then((responseData: Food[]) => {
                setData(responseData);
                setLoading(false);
                console.log('ResponseData: ', responseData);
            })
            .catch(
                err => {
                    console.log('Error: ', err);
                    setLoading(false);
                }
            );
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        // <div className="overflow-x-auto justify-right ">
        <div>
            {foodsList && foodsList.map((food: Food) => (
                <div key={food.fd_id}   className="py-1">
                <div className="rounded-box bg-neutral">
                    {/* <input type="checkbox" />  */}
                    <div className="collapse-title text-xl font-medium">
                        {food.name}
                    
                        <div className="stat-desc flex">
                            Calories: {food.calories} | Carbs: {food.carbs} | Protein: {food.protein} | Fats: {food.fats}
                        </div>
                    </div>
                </div>
                </div>
            ))}       
        </div>
    )
}
export default ListOfFoods;