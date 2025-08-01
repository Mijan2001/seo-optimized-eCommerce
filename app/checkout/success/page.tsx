import type { Metadata } from 'next';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Payment Successful - eCommerce',
    description: 'Your payment has been processed successfully.',
    robots: {
        index: false,
        follow: false
    }
};

export default function PaymentSuccess() {
    return (
        <div className="max-w-2xl mx-auto text-center py-16">
            <CheckCircle size={64} className="mx-auto text-green-500 mb-6" />

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Payment Successful!
            </h1>

            <p className="text-gray-600 mb-8">
                Thank you for your purchase. Your payment has been processed
                successfully and your order is being prepared.
            </p>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    What&#39;s Next?
                </h2>
                <ul className="text-left space-y-2 text-gray-700">
                    <li>• You&#39;ll receive an email confirmation shortly</li>
                    <li>
                        • Your order will be processed within 1-2 business days
                    </li>
                    <li>• You can track your order in the Orders section</li>
                </ul>
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
