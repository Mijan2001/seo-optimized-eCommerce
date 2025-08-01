'use client';

import type React from 'react';

import { useState } from 'react';
import {
    PaymentElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import { CreditCard, Lock } from 'lucide-react';

interface StripePaymentFormProps {
    onPaymentSuccess: () => void;
    onPaymentError: (error: string) => void;
    isProcessing: boolean;
    setIsProcessing: (processing: boolean) => void;
}

export function StripePaymentForm({
    onPaymentSuccess,
    onPaymentError,
    isProcessing,
    setIsProcessing
}: StripePaymentFormProps) {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);
        setMessage('');

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/checkout/success`
            },
            redirect: 'if_required'
        });

        if (error) {
            if (
                error.type === 'card_error' ||
                error.type === 'validation_error'
            ) {
                setMessage(error.message || 'An error occurred');
                onPaymentError(error.message || 'Payment failed');
            } else {
                setMessage('An unexpected error occurred.');
                onPaymentError('An unexpected error occurred');
            }
        } else {
            onPaymentSuccess();
        }

        setIsProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-4">
                    <CreditCard className="text-blue-600" size={20} />
                    <h3 className="font-semibold text-gray-900">
                        Payment Information
                    </h3>
                    <Lock className="text-green-600" size={16} />
                </div>

                <PaymentElement
                    options={{
                        layout: 'tabs'
                    }}
                />
            </div>

            {message && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                    {message}
                </div>
            )}

            <button
                type="submit"
                disabled={isProcessing || !stripe || !elements}
                className={`w-full py-3 px-4 rounded-md font-medium transition-colors flex items-center justify-center space-x-2 ${
                    isProcessing || !stripe || !elements
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
            >
                <Lock size={16} />
                <span>
                    {isProcessing
                        ? 'Processing Payment...'
                        : 'Complete Payment'}
                </span>
            </button>

            <div className="text-xs text-gray-500 text-center">
                <Lock className="inline mr-1" size={12} />
                Your payment information is secure and encrypted
            </div>
        </form>
    );
}
