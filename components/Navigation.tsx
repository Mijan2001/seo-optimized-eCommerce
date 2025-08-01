'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { ShoppingCart, Package, Home } from 'lucide-react';

export function Navigation() {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <nav className="bg-white shadow-md border-b">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="text-2xl font-bold text-blue-600">
                        ECommerce
                    </Link>

                    <div className="flex items-center space-x-6">
                        <Link
                            href="/"
                            className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            <Home size={20} />
                            <span>Home</span>
                        </Link>

                        <Link
                            href="/orders"
                            className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            <Package size={20} />
                            <span>Orders</span>
                        </Link>

                        <Link
                            href="/checkout"
                            className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors relative"
                        >
                            <ShoppingCart size={20} />
                            <span>Cart</span>
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
