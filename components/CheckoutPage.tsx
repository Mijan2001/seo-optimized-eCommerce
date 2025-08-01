'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/store';
import { clearCart } from '@/store/cartSlice';
import { addOrder } from '@/store/orderSlice';
import { CartItem } from './CartItem';
import { CheckoutForm } from './CheckoutForm';
import { OrderConfirmation } from './OrderConfirmation';
import { ShoppingBag } from 'lucide-react';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '@/lib/stripe';
import { StripePaymentForm } from './StripePaymentForm';
import Link from 'next/link';
import { CustomerData, OrderData } from '@/types/product';

export function CheckoutPage() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const [isOrderComplete, setIsOrderComplete] = useState(false);
    const [orderData, setOrderData] = useState<OrderData | null>(null);
    const [clientSecret, setClientSecret] = useState<string>('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentStep, setPaymentStep] = useState<'shipping' | 'payment'>(
        'shipping'
    );

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const createPaymentIntent = async (customerData: CustomerData) => {
        try {
            const response = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    amount: total,
                    customerData
                })
            });

            const { clientSecret } = await response.json();
            setClientSecret(clientSecret);
            setPaymentStep('payment');
        } catch (error) {
            console.error('Error creating payment intent:', error);
        }
    };

    const handleOrderSubmit = async (customerData: CustomerData) => {
        if (paymentStep === 'shipping') {
            await createPaymentIntent(customerData);
            return;
        }
    };

    const handlePaymentSuccess = () => {
        const order = {
            id: Date.now().toString(),
            customerName: 'Customer',
            items: cartItems,
            total,
            totalItems,
            date: new Date().toISOString(),
            shippingAddress: 'Address',
            phone: 'Phone',
            paymentStatus: 'paid'
        };

        dispatch(addOrder(order));
        dispatch(clearCart());
        setOrderData(order);
        setIsOrderComplete(true);
    };

    const handlePaymentError = (error: string) => {
        console.error('Payment error:', error);
        // Handle payment error (show message to user)
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

                {paymentStep === 'shipping' && (
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">
                            Shipping Information
                        </h2>
                        <CheckoutForm onSubmit={handleOrderSubmit} />
                    </div>
                )}

                {paymentStep === 'payment' && clientSecret && (
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">
                            Payment
                        </h2>
                        <Elements
                            stripe={stripePromise}
                            options={{
                                clientSecret,
                                appearance: {
                                    theme: 'stripe'
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
                )}
            </div>
        </div>
    );
}
