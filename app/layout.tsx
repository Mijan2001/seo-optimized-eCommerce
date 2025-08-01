import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Navigation } from '@/components/Navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'eCommerce - Your Premium E-commerce Destination',
    description:
        'Discover amazing products at unbeatable prices. Shop electronics, clothing, jewelry and more with fast shipping and excellent customer service.',
    keywords:
        'ecommerce, shopping, electronics, clothing, jewelry, online store',
    authors: [{ name: 'eCommerce Team' }],
    openGraph: {
        title: 'eCommerce - Your Premium E-commerce Destination',
        description: 'Discover amazing products at unbeatable prices.',
        type: 'website',
        locale: 'en_US'
    },
    robots: {
        index: true,
        follow: true
    },
    generator: 'v0.dev'
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <div className="min-h-screen bg-gray-50">
                        <Navigation />
                        <main className="container mx-auto px-4 py-8">
                            {children}
                        </main>

                        <ToastContainer
                            position="top-right"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop={true}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                    </div>
                </Providers>
            </body>
        </html>
    );
}
