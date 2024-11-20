import React from 'react';
import { Trash2 } from 'lucide-react';
import { CartItem } from '../types';
import { NutrientBar } from './NutrientBar';

interface CartProps {
  items: CartItem[];
  onRemove: (id: number) => void;
}

export function Cart({ items, onRemove }: CartProps) {
  const totals = items.reduce(
    (acc, { item, quantity }) => ({
      calories: acc.calories + item.calories * quantity,
      protein: acc.protein + item.protein * quantity,
      carbs: acc.carbs + item.carbs * quantity,
      fats: acc.fats + item.fats * quantity,
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <p className="text-gray-500 text-center">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Cart Summary</h2>
        <div className="text-lg font-medium text-gray-900">
          Total Calories: {totals.calories}
        </div>
        <div className="space-y-3">
          <NutrientBar label="Total Protein" value={totals.protein} max={150} color="bg-blue-500" />
          <NutrientBar label="Total Carbs" value={totals.carbs} max={300} color="bg-amber-500" />
          <NutrientBar label="Total Fats" value={totals.fats} max={120} color="bg-rose-500" />
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {items.map(({ item, quantity }) => (
          <div key={item.id} className="py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">Quantity: {quantity}</p>
              </div>
            </div>
            <button
              onClick={() => onRemove(item.id)}
              className="text-gray-400 hover:text-rose-500 transition-colors duration-200"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}