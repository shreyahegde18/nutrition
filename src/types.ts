export interface FoodItem {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  image: string;
}

export interface CartItem {
  item: FoodItem;
  quantity: number;
}

export interface UserProfile {
  goal: 'weight_loss' | 'muscle_gain' | 'maintenance';
  dietaryRestrictions: string[];
  targetCalories: number;
  targetProtein: number;
  targetCarbs: number;
  targetFats: number;
}

export interface MealPlan {
  meals: {
    name: string;
    foods: FoodItem[];
    timing: string;
  }[];
  totalNutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
}