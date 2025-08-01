import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '@/types/product';

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(
                item => item.id === action.payload.id
            );

            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        },

        updateQuantity: (
            state,
            action: PayloadAction<{ id: number; quantity: number }>
        ) => {
            const item = state.items.find(
                item => item.id === action.payload.id
            );
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },

        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(
                item => item.id !== action.payload
            );
        },

        clearCart: state => {
            state.items = [];
        }
    }
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } =
    cartSlice.actions;
export default cartSlice.reducer;
