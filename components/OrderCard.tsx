'use client';

import { OrderData } from '@/types/product';
import { ChevronRight } from 'lucide-react';

interface OrderCardProps {
    order: OrderData;
    onClick: () => void;
}

export function OrderCard({ order, onClick }: OrderCardProps) {
    const orderDate = new Date(order.date).toLocaleDateString();

    return (
        <div
            onClick={onClick}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
        >
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Order #{order.id}
                        </h3>
                        <span className="text-sm text-gray-500">
                            {orderDate}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                        <div>
                            <span className="text-gray-600">Customer:</span>
                            <p className="font-medium">{order.customerName}</p>
                        </div>

                        <div>
                            <span className="text-gray-600">Items:</span>
                            <p className="font-medium">{order.totalItems}</p>
                        </div>

                        <div>
                            <span className="text-gray-600">Total:</span>
                            <p className="font-medium text-blue-600">
                                ${order.total.toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>

                <ChevronRight className="text-gray-400 ml-4" size={20} />
            </div>
        </div>
    );
}
