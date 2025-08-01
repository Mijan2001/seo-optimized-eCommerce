'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import type { RootState } from '@/store';
import { clearCart } from '@/store/cartSlice';
import { addOrder } from '@/store/orderSlice';
import { stripePromise } from '@/lib/stripe';
import { CartItem } from './CartItem';
import { CheckoutForm } from './CheckoutForm';
import { StripePaymentForm } from './StripePaymentForm';
import { OrderConfirmation } from './OrderConfirmation';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { OrderData } from '@/types/product';

interface CustomerData {
    fullName: string;
    address: string;
    phone: string;
}
// interface OrderData {
//     id: string;
//     customerName: string;
//     items: typeof CartItem;
//     total: number;
//     totalItems: number;
//     date: string;
//     shippingAddress: string;
//     phone: string;
//     paymentStatus: string;
// }
export function CheckoutPageWithStripe() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const [isOrderComplete, setIsOrderComplete] = useState(false);

    const [orderData, setOrderData] = useState<OrderData | null>(null);
    const [clientSecret, setClientSecret] = useState<string>('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentStep, setPaymentStep] = useState<'shipping' | 'payment'>(
        'shipping'
    );
    const [customerData, setCustomerData] = useState<CustomerData | null>(null);

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const createPaymentIntent = async (customerInfo: CustomerData) => {
        try {
            const response = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    amount: total,
                    customerData: customerInfo
                })
            });

            if (!response.ok) {
                throw new Error('Failed to create payment intent');
            }

            const { clientSecret } = await response.json();
            setClientSecret(clientSecret);
            setCustomerData(customerInfo);
            setPaymentStep('payment');
        } catch (error) {
            console.error('Error creating payment intent:', error);
            alert('Failed to initialize payment. Please try again.');
        }
    };

    const handleShippingSubmit = async (data: CustomerData) => {
        await createPaymentIntent(data);
    };

    const handlePaymentSuccess = () => {
        if (!customerData) return;

        const order = {
            id: Date.now().toString(),
            customerName: customerData.fullName,
            items: cartItems,
            total,
            totalItems,
            date: new Date().toISOString(),
            shippingAddress: customerData.address,
            phone: customerData.phone,
            paymentStatus: 'paid'
        };

        dispatch(addOrder(order));
        dispatch(clearCart());
        setOrderData(order);
        setIsOrderComplete(true);
    };

    const handlePaymentError = (error: string) => {
        console.error('Payment error:', error);
        alert(`Payment failed: ${error}`);
    };

    const handleBackToShipping = () => {
        setPaymentStep('shipping');
        setClientSecret('');
        setCustomerData(null);
    };

    if (isOrderComplete && orderData) {
        return <OrderConfirmation order={orderData} />;
    }

    if (cartItems.length === 0) {
        return (
            <div className="text-center py-16">
                <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Your cart is empty
                </h2>
                <p className="text-gray-600 mb-8">
                    Add some products to get started!
                </p>
                <Link
                    href="/"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Order Summary - Always visible */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                        Order Summary
                    </h2>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="space-y-4 mb-6">
                            {cartItems.map(item => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        </div>

                        <div className="border-t pt-4">
                            <div className="flex justify-between items-center text-lg font-semibold">
                                <span>Total ({totalItems} items):</span>
                                <span className="text-blue-600">
                                    ${total.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Shipping or Payment Form */}
                <div>
                    {paymentStep === 'shipping' && (
                        <>
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                Shipping Information
                            </h2>
                            <CheckoutForm onSubmit={handleShippingSubmit} />
                        </>
                    )}

                    {paymentStep === 'payment' && clientSecret && (
                        <>
                            <div className="flex items-center mb-6">
                                <button
                                    onClick={handleBackToShipping}
                                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mr-4"
                                >
                                    <ArrowLeft size={20} />
                                    <span>Back</span>
                                </button>
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Payment
                                </h2>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6">
                                <Elements
                                    stripe={stripePromise}
                                    options={{
                                        clientSecret,
                                        appearance: {
                                            theme: 'stripe',
                                            variables: {
                                                colorPrimary: '#2563eb'
                                            }
                                        }
                                    }}
                                >
                                    <StripePaymentForm
                                        onPaymentSuccess={handlePaymentSuccess}
                                        onPaymentError={handlePaymentError}
                                        isProcessing={isProcessing}
                                        setIsProcessing={setIsProcessing}
                                    />
                                </Elements>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
