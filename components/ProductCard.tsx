import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types/product';
import { Star } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48 bg-gray-100">
                <Image
                    src={product.image || '/placeholder.svg'}
                    alt={product.title}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
            </div>

            <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
                    {product.title}
                </h3>

                <div className="flex items-center mb-2">
                    <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm text-gray-600">
                            {product.rating.rate} ({product.rating.count})
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">
                        ${product.price.toFixed(2)}
                    </span>

                    <Link
                        href={`/product/${product.id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}
