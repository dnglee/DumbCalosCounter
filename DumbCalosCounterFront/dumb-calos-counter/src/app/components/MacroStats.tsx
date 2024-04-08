"use client";
import React, { useEffect, useState } from 'react';
import Container from '../components/Container';
import { fetchAllCalos } from '../services/backendapi';
import  Food  from '../models/IFood';
import  ConsolidatedFoodStats from '../models/IConsolidatedFoodStats';
import MacroTargets from '../models/IMacroTargets';
import { MatchOptions } from 'next/dist/server/future/route-matcher-managers/route-matcher-manager';


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

const HandleMacroTargets = () : MacroTargets => {
  console.log('HandleMacroTargets');
  const initialMacroTargets : MacroTargets = {
    calories: 2000,
    protein: 200,
    carbs: 200,
    fats: 100,
  }
  console.log('initialMacroTargets: ', initialMacroTargets);
  return initialMacroTargets;
};

const HandleLeftOver = (data: ConsolidatedFoodStats | null, macroTargets: MacroTargets | null): MacroTargets => {
  console.log('CheckMacroTargetsNUll: ', data);
  const leftOver: MacroTargets = {
    protein: 0,
    carbs: 0,
    fats: 0,
    calories: 0,

  };

  if(!data || !macroTargets) { return leftOver; }
  
  leftOver.protein = macroTargets.protein - (data.protein || 0);// Default to 0 if data.protein is null
  leftOver.carbs = macroTargets.carbs - (data.carbs || 0); // Default to 0 if data.carbs is null
  leftOver.fats = macroTargets.fats - (data.fats || 0); // Default to 0 if data.fats is null
  leftOver.calories = macroTargets.calories - (data.calories || 0); // Default to 0 if data.calories is null

  
  return leftOver;
}

const MacroStats = () => {
  const [data, setData] = useState<ConsolidatedFoodStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [macroTargets, setMacroTargets] = useState<MacroTargets | null>(null);
  const [leftMacroTargets, setLeftMacroTargets] = useState<MacroTargets | null>(null);
  //add end point to user specific configs 
  

  useEffect(() => {
      fetchAllCalos()
        .then((responseData: Food[]) => {
          const consolidatedFoods = ConsolidateData(responseData)
          const calculatedMacroTargets = HandleMacroTargets();
          const newLeftMacroTargets = HandleLeftOver(consolidatedFoods, calculatedMacroTargets);

          setData(consolidatedFoods);
          console.log('MacroTargets 1: ', macroTargets);
          setMacroTargets(calculatedMacroTargets);
          setLeftMacroTargets(newLeftMacroTargets);
          console.log('MacroTargets: ', newLeftMacroTargets);
          setLoading(false);
          console.log('ResponseData: ',leftMacroTargets);
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
      
        <div className="stats bg-neutral stats-vertical lg:stats-horizontal shadow">
          <div className="stat">
            <div className="stat-title">Calories</div>
            <div className="stat-value text-primary">{data?.calories}g</div> 
            <div className="stat-actions"></div>
            <progress className="progress progress-success w-56 " value={data?.calories} max={macroTargets?.calories}></progress>
            <div className="stat-desc flex justify-between">
              <span >{data?.calories}g</span> 
              <span >left {leftMacroTargets?.calories} g</span> 
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">Protein</div>
            <div className="stat-value">{data?.protein}g</div> 
            <div className="stat-actions"></div>
            <progress className="progress progress-success w-56 " value={data?.protein} max={macroTargets?.protein}></progress>
            <div className="stat-desc flex justify-between">
              <span >{data?.protein}g</span> 
              <span >left {leftMacroTargets?.protein} g</span> 
            </div>
          </div>
          
          <div className="stat">
            <div className="stat-title">Carbohydrates</div>
            <div className="stat-value">{data?.carbs}g</div>
            <div className="stat-actions"></div>
            <progress className="progress progress-success w-56" value={data?.carbs} max={macroTargets?.carbs}></progress>
            <div className="stat-desc flex justify-between">
              <span >{data?.carbs}g</span> 
              <span >left {leftMacroTargets?.carbs} g</span> 
            </div>
          </div>
          
          <div className="stat">
            <div className="stat-title">Fats</div>
            <div className="stat-value">{data?.fats}g</div>
            <div className="stat-actions"></div>
            <progress className="progress progress-success w-56" value={data?.fats} max={macroTargets?.fats}></progress>
            <div className="stat-desc flex justify-between">
              <span >{data?.fats}g</span> 
              <span >left {leftMacroTargets?.fats} g</span> 
            </div>
          </div>
        </div>
    );
}

export default MacroStats; 

