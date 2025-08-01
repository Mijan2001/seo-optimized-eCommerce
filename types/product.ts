export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

export interface CartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

export interface OrderData {
    id: string;
    customerName: string;
    items: CartItem[];
    total: number;
    totalItems: number;
    date: string;
    shippingAddress: string;
    phone: string;
    paymentStatus?: string;
}

export interface CustomerData {
    fullName: string;
    address: string;
    phone: string;
}
