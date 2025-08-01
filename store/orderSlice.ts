import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface OrderItem {
    productId: string;
    name: string;
    quantity: number;
    price: number;
}

interface Order {
    id: string;
    customerName: string;
    items: any[];
    total: number;
    totalItems: number;
    date: string;
    shippingAddress: string;
    phone: string;
}

interface OrderState {
    orders: Order[];
}

const initialState: OrderState = {
    orders: []
};

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<Order>) => {
            state.orders.unshift(action.payload); // Add to beginning for newest first
        }
    }
});

export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;
