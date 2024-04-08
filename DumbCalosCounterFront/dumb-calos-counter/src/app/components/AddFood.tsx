import React, { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import FoodToAdd from '../models/IAddFoods';
import { addFood } from '../services/backendapi';



const AddFood: React.FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const passDigitsOnly = new RegExp('^[0-9]+(?:\.[0-9]+)?$');
    const passAlphaOnly = new RegExp('^[a-zA-Z]+$');

    
    const { handleSubmit, register, formState: { isValid, errors}} = useForm<FoodToAdd>({
        mode: 'onChange',
    });



    const handleRegistration = (addFoodData: FoodToAdd) => {
        setIsLoading(true);
        console.log('Data: ', addFoodData);
        addFood(addFoodData);
        setIsLoading(false);
    };
    
    return (
        <div className="rounded-box grid grid-flow-row grid bg-neutral">
           <form className="grid grid-cols-subgrid" onSubmit={handleSubmit(handleRegistration)}>
                
                {errors?.name?.type === 'required' && <span className="text-red-500">Name is required</span>}
                {errors?.name?.type === 'pattern' && <span className="text-red-500">No numeric, only letters</span>}
                <label className="stat-title" htmlFor="Name">Name:</label>
                <div className="mt-2">
                    <input type="text"{...register('name', {
                        required: true,
                        pattern: passAlphaOnly
                    })} placeholder="Type here" className="input input-bordered input-xs w-full max-w-xs" />
                </div>

                <label className="stat-title mt-5" htmlFor="calories">Calories:</label>
                <div className="mt-2">
                    <input type="text"{...register('calories', {
                        required: true,
                        pattern: passDigitsOnly
                    })} placeholder="Type here" className="input input-bordered input-xs w-full max-w-xs" />
                </div>

                <label className="stat-title mt-5" htmlFor="protein">Protein:</label>
                <div className="mt-2">
                    <input type="text"{...register('protein', {
                        required: true,
                        pattern: passDigitsOnly
                    })} placeholder="Type here" className="input input-bordered input-xs w-full max-w-xs" />
                </div>

                <label className="stat-title mt-5" htmlFor="carbs">Carbs:</label>
                <div className="mt-2">
                    <input type="text"{...register('carbs', {
                        required: true,
                        pattern: passDigitsOnly
                    })} placeholder="Type here" className="input input-bordered input-xs w-full max-w-xs" />
                </div>

                <label className="stat-title mt-5" htmlFor="fats">Fats:</label>
                <div className="mt-2">
                    <input type="text"{...register('fats', {
                        required: true,
                        pattern: passDigitsOnly
                    })} placeholder="Type here" className="input input-bordered input-xs w-full max-w-xs" />
                </div>

                <div className="mt-5 ">
                <button className="btn btn-primary" type="submit" disabled={!isValid}>
                    {isLoading ? 'Loading...' : 'Submit'}
                </button>
                </div>
            </form>
        </div>
    );
};

export default AddFood;