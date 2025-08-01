'use client';

import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '@/store/cartSlice';
import type { CartItem as CartItemType } from '@/types/product';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartItemProps {
    item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
    const dispatch = useDispatch();

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity <= 0) {
            dispatch(removeFromCart(item.id));
        } else {
            dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
        }
    };

    return (
        <div className="flex items-center space-x-4 py-4 border-b last:border-b-0">
            <div className="relative h-16 w-16 bg-gray-100 rounded-md">
                <Image
                    src={item.image || '/placeholder.svg'}
                    alt={item.title}
                    fill
                    className="object-contain p-2"
                />
            </div>

            <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">
                    {item.title}
                </h3>
                <p className="text-blue-600 font-semibold">
                    ${item.price.toFixed(2)}
                </p>
            </div>

            <div className="flex items-center space-x-2">
                <button
                    onClick={() => handleQuantityChange(item.quantity - 1)}
                    className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                >
                    <Minus size={16} />
                </button>

                <span className="w-8 text-center font-medium">
                    {item.quantity}
                </span>

                <button
                    onClick={() => handleQuantityChange(item.quantity + 1)}
                    className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                >
                    <Plus size={16} />
                </button>

                <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="p-1 rounded-md hover:bg-red-100 text-red-600 transition-colors ml-2"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
}
