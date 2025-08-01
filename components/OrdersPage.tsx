'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { OrderCard } from './OrderCard';
import { OrderDetails } from './OrderDetails';
import { Package } from 'lucide-react';
import Link from 'next/link';
import { OrderData } from '@/types/product';

export function OrdersPage() {
    const orders = useSelector((state: RootState) => state.orders.orders);
    const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);

    if (orders.length === 0) {
        return (
            <div className="text-center py-16">
                <Package size={64} className="mx-auto text-gray-400 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    No orders yet
                </h2>
                <p className="text-gray-600 mb-8">
                    When you place orders, they&#39;ll appear here.
                </p>
                <Link
                    href="/"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    if (selectedOrder) {
        return (
            <OrderDetails
                order={selectedOrder}
                onBack={() => setSelectedOrder(null)}
            />
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

            <div className="space-y-4">
                {orders.map(order => (
                    <OrderCard
                        key={order.id}
                        order={order}
                        onClick={() => setSelectedOrder(order)}
                    />
                ))}
            </div>
        </div>
    );
}
