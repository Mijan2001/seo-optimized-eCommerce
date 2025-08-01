'use client';

import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { CartItem, OrderData } from '@/types/product';

interface OrderDetailsProps {
    order: OrderData;
    onBack: () => void;
}

export function OrderDetails({ order, onBack }: OrderDetailsProps) {
    const orderDate = new Date(order.date).toLocaleDateString();

    return (
        <div>
            <button
                onClick={onBack}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6"
            >
                <ArrowLeft size={20} />
                <span>Back to Orders</span>
            </button>

            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="border-b pb-6 mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        Order #{order.id}
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Customer Information
                            </h3>
                            <p className="text-gray-700">
                                {order.customerName}
                            </p>
                            <p className="text-gray-700">{order.phone}</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Shipping Address
                            </h3>
                            <p className="text-gray-700 whitespace-pre-line">
                                {order.shippingAddress}
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 text-sm text-gray-600">
                        Order placed on {orderDate}
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-900 mb-4">
                        Order Items
                    </h3>

                    <div className="space-y-4">
                        {order.items.map((item: CartItem) => (
                            <div
                                key={item.id}
                                className="flex items-center space-x-4 py-4 border-b last:border-b-0"
                            >
                                <div className="relative h-16 w-16 bg-gray-100 rounded-md">
                                    <Image
                                        src={item.image || '/placeholder.svg'}
                                        alt={item.title}
                                        fill
                                        className="object-contain p-2"
                                    />
                                </div>

                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-900">
                                        {item.title}
                                    </h4>
                                    <p className="text-gray-600">
                                        Quantity: {item.quantity}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="font-semibold text-blue-600">
                                        $
                                        {(item.price * item.quantity).toFixed(
                                            2
                                        )}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        ${item.price.toFixed(2)} each
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t pt-4 mt-6">
                        <div className="flex justify-between items-center text-xl font-bold">
                            <span>Total:</span>
                            <span className="text-blue-600">
                                ${order.total.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
