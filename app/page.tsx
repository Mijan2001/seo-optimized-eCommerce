import type { Metadata } from 'next';
import { ProductGrid } from '@/components/ProductGrid';
import type { Product } from '@/types/product';

export const metadata: Metadata = {
    title: 'Home - eCommerce | Premium Products at Great Prices',
    description:
        'Browse our extensive collection of electronics, clothing, jewelry and more. Find the perfect products with fast shipping and excellent customer service.'
};

async function getProducts(): Promise<Product[]> {
    try {
        const res = await fetch('https://fakestoreapi.com/products', {
            next: { revalidate: 3600 } // Revalidate every hour
        });

        if (!res.ok) {
            throw new Error('Failed to fetch products');
        }

        return res.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

export default async function HomePage() {
    const products = await getProducts();

    return (
        <div>
            <section className="mb-12">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 text-center">
                    <h1 className="text-4xl font-bold mb-4">
                        Welcome to ECommerce
                    </h1>
                    <p className="text-xl opacity-90">
                        Discover amazing products at unbeatable prices
                    </p>
                </div>
            </section>

            <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                    Featured Products
                </h2>
                <ProductGrid products={products} />
            </section>
        </div>
    );
}
