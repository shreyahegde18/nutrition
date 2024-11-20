import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { UserProfile, MealPlan } from '../types';
import { generateMealPlan } from '../services/mealPlanService';

interface MealPlanGeneratorProps {
  onMealPlanGenerated: (plan: MealPlan) => void;
}

export function MealPlanGenerator({ onMealPlanGenerated }: MealPlanGeneratorProps) {
  const [profile, setProfile] = useState<UserProfile>({
    goal: 'maintenance',
    dietaryRestrictions: [],
    targetCalories: 2000,
    targetProtein: 150,
    targetCarbs: 200,
    targetFats: 70,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const plan = await generateMealPlan(profile);
      onMealPlanGenerated(plan);
    } catch (error) {
      console.error('Failed to generate meal plan:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="text-emerald-500" size={24} />
        <h2 className="text-2xl font-semibold text-gray-900">AI Meal Planner</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Goal
          </label>
          <select
            value={profile.goal}
            onChange={(e) => setProfile({ ...profile, goal: e.target.value as UserProfile['goal'] })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          >
            <option value="weight_loss">Weight Loss</option>
            <option value="muscle_gain">Muscle Gain</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Target Calories
          </label>
          <input
            type="number"
            value={profile.targetCalories}
            onChange={(e) => setProfile({ ...profile, targetCalories: Number(e.target.value) })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Protein (g)
            </label>
            <input
              type="number"
              value={profile.targetProtein}
              onChange={(e) => setProfile({ ...profile, targetProtein: Number(e.target.value) })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Carbs (g)
            </label>
            <input
              type="number"
              value={profile.targetCarbs}
              onChange={(e) => setProfile({ ...profile, targetCarbs: Number(e.target.value) })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fats (g)
            </label>
            <input
              type="number"
              value={profile.targetFats}
              onChange={(e) => setProfile({ ...profile, targetFats: Number(e.target.value) })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-500 text-white py-2 px-4 rounded-md hover:bg-emerald-600 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Generating Plan...
            </>
          ) : (
            <>
              <Sparkles size={20} />
              Generate Meal Plan
            </>
          )}
        </button>
      </form>
    </div>
  );
}