"use client";
import React, { useEffect, useState } from 'react';
import { fetchAllCalos } from '../services/backendapi';

interface Food {
  name: string;
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
}

interface ConsolidatedFoodStats {
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
}

const ConsolidateData = (data: Food[]): ConsolidatedFoodStats => {
  const initialStats: ConsolidatedFoodStats = {
    protein: 0,
    carbs: 0,
    fats: 0,
    calories: 0,
  }
  data.forEach((food: Food) => {
    initialStats.protein += food.protein;
    initialStats.carbs += food.carbs;
    initialStats.fats += food.fats;
    initialStats.calories += food.calories;
  });
  return initialStats;
}

const MacroStats = () => {
  const [data, setData] = useState<ConsolidatedFoodStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      fetchAllCalos()
        .then((responseData: Food[]) => {
          // setData(responseData);
          setData(ConsolidateData(responseData));
          setLoading(false);
          console.log('ResponseData: ',responseData);
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
      <div className="stats stats-vertical lg:stats-horizontal shadow">
  
        <div className="stat">
          <div className="stat-title">Protein</div>
          <div className="stat-value">{data?.protein}g</div> 
          <div className="stat-actions"></div>
          <progress className="progress progress-success w-56 " value={data?.protein} max="200"></progress>
        </div>
        
        <div className="stat">
          <div className="stat-title">Carbohydrates</div>
          <div className="stat-value">{data?.carbs}g</div>
          <div className="stat-actions"></div>
          <progress className="progress progress-success w-56" value={data?.carbs} max="100"></progress>
        </div>
        
        <div className="stat">
          <div className="stat-title">Fats</div>
          <div className="stat-value">{data?.fats}g</div>
          <div className="stat-actions"></div>
          <progress className="progress progress-success w-56" value={data?.fats} max="100"></progress>
        </div>
      </div>
    );
}

export default MacroStats; 