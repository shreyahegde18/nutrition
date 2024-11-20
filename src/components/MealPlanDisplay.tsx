import React from 'react';
import { Clock } from 'lucide-react';
import { MealPlan } from '../types';
import { NutrientBar } from './NutrientBar';

interface MealPlanDisplayProps {
  plan: MealPlan;
}

export function MealPlanDisplay({ plan }: MealPlanDisplayProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Your Meal Plan</h2>

      <div className="space-y-3">
        <h3 className="text-lg font-medium text-gray-900">Daily Nutrition Totals</h3>
        <div className="text-gray-600 mb-2">
          Total Calories: {plan.totalNutrition.calories}
        </div>
        <NutrientBar
          label="Protein"
          value={plan.totalNutrition.protein}
          max={150}
          color="bg-blue-500"
        />
        <NutrientBar
          label="Carbs"
          value={plan.totalNutrition.carbs}
          max={300}
          color="bg-amber-500"
        />
        <NutrientBar
          label="Fats"
          value={plan.totalNutrition.fats}
          max={120}
          color="bg-rose-500"
        />
      </div>

      <div className="space-y-6">
        {plan.meals.map((meal, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">{meal.name}</h3>
              <div className="flex items-center text-gray-500">
                <Clock size={16} className="mr-1" />
                {meal.timing}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {meal.foods.map((food, foodIndex) => (
                <div
                  key={foodIndex}
                  className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3"
                >
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{food.name}</p>
                    <p className="text-sm text-gray-500">
                      {food.calories} cal | {food.protein}g protein
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}