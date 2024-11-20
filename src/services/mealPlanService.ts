import { UserProfile, MealPlan, FoodItem } from '../types';
import { foodItems } from '../data';

const HUGGINGFACE_API_URL = 'https://api-inference.huggingface.co/models/google/flan-t5-base';

export async function generateMealPlan(profile: UserProfile): Promise<MealPlan> {
  try {
    // Create a structured prompt for the model
    const prompt = `Generate a meal plan for a person with these goals:
      - Goal: ${profile.goal}
      - Target Calories: ${profile.targetCalories} calories
      - Target Protein: ${profile.targetProtein}g
      - Target Carbs: ${profile.targetCarbs}g
      - Target Fats: ${profile.targetFats}g

      Available foods: ${foodItems.map(f => f.name).join(', ')}

      Create a meal plan using only the available foods listed above.
      Format: Breakfast (time), Lunch (time), Dinner (time)`;

    // Call Hugging Face API
    const response = await fetch(HUGGINGFACE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate meal plan');
    }

    const result = await response.json();
    
    // Parse the model's response and create a structured meal plan
    // For demo purposes, we'll create a simple meal plan using available foods
    const samplePlan: MealPlan = {
      meals: [
        {
          name: 'Breakfast',
          timing: '8:00 AM',
          foods: [foodItems[2]], // Greek Yogurt
        },
        {
          name: 'Lunch',
          timing: '1:00 PM',
          foods: [foodItems[1]], // Quinoa Bowl
        },
        {
          name: 'Dinner',
          timing: '7:00 PM',
          foods: [foodItems[0]], // Grilled Salmon
        },
      ],
      totalNutrition: calculateTotalNutrition([
        { foods: [2] },
        { foods: [1] },
        { foods: [0] },
      ]),
    };

    return samplePlan;
  } catch (error) {
    console.error('Error generating meal plan:', error);
    throw error;
  }
}

function calculateTotalNutrition(meals: any[]): MealPlan['totalNutrition'] {
  const totals = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  };

  meals.forEach(meal => {
    meal.foods.forEach((foodId: number) => {
      const food = foodItems.find(f => f.id === foodId);
      if (food) {
        totals.calories += food.calories;
        totals.protein += food.protein;
        totals.carbs += food.carbs;
        totals.fats += food.fats;
      }
    });
  });

  return totals;
}