'use client';

import { toast } from '@/lib/toast';
import type React from 'react';

import { useState } from 'react';
import { FormData, FormErrors } from './../types/formData';

interface CheckoutFormProps {
    onSubmit: (data: FormData) => void;
}

export function CheckoutForm({ onSubmit }: CheckoutFormProps) {
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        address: '',
        phone: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Shipping address is required';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success('Order placed successfully!');

        onSubmit(formData);
        setIsSubmitting(false);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-md p-6 space-y-6"
        >
            <div>
                <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Full Name *
                </label>
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                />
                {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.fullName}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Shipping Address *
                </label>
                <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your complete shipping address"
                />
                {errors.address && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.address}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Phone Number *
                </label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your phone number"
                />
                {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
                    isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
            >
                {isSubmitting ? 'Processing...' : 'Place Order'}
            </button>
        </form>
    );
}
