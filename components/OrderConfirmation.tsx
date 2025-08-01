import { OrderData } from '@/types/product';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface OrderConfirmationProps {
    order: OrderData;
}

export function OrderConfirmation({ order }: OrderConfirmationProps) {
    return (
        <div className="max-w-2xl mx-auto text-center py-16">
            <CheckCircle size={64} className="mx-auto text-green-500 mb-6" />

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Thank You for Your Order!
            </h1>

            <p className="text-gray-600 mb-8">
                Your order has been successfully placed and is being processed.
            </p>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8 text-left">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Order Details
                </h2>

                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Order ID:</span>
                        <span className="font-medium">#{order.id}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Customer:</span>
                        <span className="font-medium">
                            {order.customerName}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Items:</span>
                        <span className="font-medium">{order.totalItems}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Total:</span>
                        <span className="font-medium text-blue-600">
                            ${order.total.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>

            <div className="space-x-4">
                <Link
                    href="/orders"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    View Orders
                </Link>

                <Link
                    href="/"
                    className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                >
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
}
