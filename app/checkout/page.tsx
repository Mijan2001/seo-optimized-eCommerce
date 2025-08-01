import type { Metadata } from 'next';
import { CheckoutPageWithStripe } from '@/components/CheckoutPageWithStripe';

export const metadata: Metadata = {
    title: 'Checkout - eCommerce',
    description:
        'Complete your purchase securely with our streamlined checkout process.',
    robots: {
        index: false,
        follow: false
    }
};

export default function Checkout() {
    return <CheckoutPageWithStripe />;
}
