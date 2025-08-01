import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductDetails } from '@/components/ProductDetails';
import type { Product } from '@/types/product';

interface ProductPageProps {
    params: Promise<{ id: string }>;
}

async function getProduct(id: string): Promise<Product | null> {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);

        if (!res.ok) {
            return null;
        }

        return res.json();
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

export async function generateStaticParams() {
    try {
        const products = await fetch('https://fakestoreapi.com/products').then(
            res => res.json()
        );

        return products.map((product: Product) => ({
            id: product.id.toString()
        }));
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
}

export async function generateMetadata({
    params
}: ProductPageProps): Promise<Metadata> {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        return {
            title: 'Product Not Found - eCommerce',
            description: 'The requested product could not be found.'
        };
    }

    return {
        title: `${product.title} - eCommerce`,
        description: product.description.slice(0, 160),
        openGraph: {
            title: product.title,
            description: product.description.slice(0, 160),
            images: [product.image]
        }
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        notFound();
    }

    return (
        <div>
            <ProductDetails product={product} />
        </div>
    );
}
