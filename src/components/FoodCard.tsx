import React from 'react';
import { Plus } from 'lucide-react';
import { FoodItem } from '../types';
import { NutrientBar } from './NutrientBar';

interface FoodCardProps {
  food: FoodItem;
  onAddToCart: (item: FoodItem) => void;
}

export function FoodCard({ food, onAddToCart }: FoodCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{food.name}</h3>
            <p className="text-gray-600">{food.calories} calories</p>
          </div>
          <button
            onClick={() => onAddToCart(food)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-full transition-colors duration-200"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="space-y-3">
          <NutrientBar label="Protein" value={food.protein} max={50} color="bg-blue-500" />
          <NutrientBar label="Carbs" value={food.carbs} max={100} color="bg-amber-500" />
          <NutrientBar label="Fats" value={food.fats} max={40} color="bg-rose-500" />
        </div>
      </div>
    </div>
  );
}