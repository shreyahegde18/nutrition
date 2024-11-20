import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { FoodCard } from './components/FoodCard';
import { Cart } from './components/Cart';
import { MealPlanGenerator } from './components/MealPlanGenerator';
import { MealPlanDisplay } from './components/MealPlanDisplay';
import { foodItems } from './data';
import type { CartItem, FoodItem, MealPlan } from './types';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);

  const addToCart = (item: FoodItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.item.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Nutrition Tracker</h1>
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <MealPlanGenerator onMealPlanGenerated={setMealPlan} />
            {mealPlan && <MealPlanDisplay plan={mealPlan} />}
            <div className="grid sm:grid-cols-2 gap-6">
              {foodItems.map((food) => (
                <FoodCard key={food.id} food={food} onAddToCart={addToCart} />
              ))}
            </div>
          </div>
          <div className={`lg:block ${isCartOpen ? 'block' : 'hidden'}`}>
            <Cart items={cartItems} onRemove={removeFromCart} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;