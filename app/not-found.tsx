import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
                <div className="mb-8">
                    <h1 className="text-6xl font-bold text-gray-300 mb-4">
                        404
                    </h1>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Page Not Found
                    </h2>
                    <p className="text-gray-600 mb-8">
                        The page you&#39;re looking for doesn&#39;t exist or has
                        been moved.
                    </p>
                </div>

                <div className="space-x-4">
                    <Link
                        href="/"
                        className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Home size={20} />
                        <span>Go Home</span>
                    </Link>

                    <Link
                        href="/"
                        className="inline-flex items-center space-x-2 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        <Search size={20} />
                        <span>Browse Products</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
