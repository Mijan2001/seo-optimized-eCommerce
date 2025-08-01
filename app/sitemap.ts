import { Product } from '@/types/product';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Fetch products for dynamic routes
    let products = [];
    try {
        const res = await fetch('https://fakestoreapi.com/products');
        products = await res.json();
    } catch (error) {
        console.error('Error fetching products for sitemap:', error);
    }

    // Static routes
    const staticRoutes = [
        {
            url: 'https://shophub.example.com',
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1
        }
    ];

    // Dynamic product routes
    const productRoutes = products.map((product: Product) => ({
        url: `https://shophub.example.com/product/${product.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8
    }));

    return [...staticRoutes, ...productRoutes];
}
