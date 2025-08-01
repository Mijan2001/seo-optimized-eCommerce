'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import type { Product } from '@/types/product';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { toast } from '@/lib/toast';

interface ProductDetailsProps {
    product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
    const dispatch = useDispatch();
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1
            })
        );
        toast.success('Product added to cart!');

        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                <div className="relative h-96 lg:h-[500px] bg-gray-100 rounded-lg">
                    <Image
                        src={product.image || '/placeholder.svg'}
                        alt={product.title}
                        fill
                        className="object-contain p-8"
                        priority
                    />
                </div>

                <div className="space-y-6">
                    <div>
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-4">
                            {product.category}
                        </span>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            {product.title}
                        </h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 text-lg font-medium text-gray-700">
                                {product.rating.rate}
                            </span>
                        </div>
                        <span className="text-gray-500">
                            ({product.rating.count} reviews)
                        </span>
                    </div>

                    <div className="text-4xl font-bold text-blue-600">
                        ${product.price.toFixed(2)}
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Description
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        disabled={isAdded}
                        className={`w-full py-3 px-6 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 ${
                            isAdded
                                ? 'bg-green-600 text-white'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                    >
                        {isAdded ? (
                            <>
                                <Check size={20} />
                                <span>Added to Cart!</span>
                            </>
                        ) : (
                            <>
                                <ShoppingCart size={20} />
                                <span>Add to Cart</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
