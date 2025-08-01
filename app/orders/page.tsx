import type { Metadata } from 'next';
import { OrdersPage } from '@/components/OrdersPage';

export const metadata: Metadata = {
    title: 'My Orders - eCommerce',
    description: 'View and track all your orders in one convenient location.',
    robots: {
        index: false,
        follow: false
    }
};

export default function Orders() {
    return <OrdersPage />;
}
