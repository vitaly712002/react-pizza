import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    totalCountItems: 0,
    totalPrice: 0
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItem: (state, action) => {
        const findItem = state.items.find((obj) => obj.basketId === action.payload.basketId);
        if(findItem) {
            findItem.count++
        }else {
            state.items.push({
                ...action.payload,
                count: 1
            })
        }
        basketSlice.caseReducers.calculateTotalPrice(state);
        basketSlice.caseReducers.calculateTotalCountItems(state);
    },

    removeItem: (state, action) => {
        state.items = state.items.filter(item => item.basketId !== action.payload);
        basketSlice.caseReducers.calculateTotalPrice(state);
        basketSlice.caseReducers.calculateTotalCountItems(state);
    },
    
    clearBasket: (state) => {
        state.items = [];
        state.totalCountItems = 0;
        state.totalPrice = 0;
    },

    incrementCount: (state, action) => {
        const findItem = state.items.find((obj) => obj.basketId === action.payload);
        findItem.count++;
        basketSlice.caseReducers.calculateTotalPrice(state);
        basketSlice.caseReducers.calculateTotalCountItems(state);
    },

    decrementCount: (state, action) => {
        const findItem = state.items.find((obj) => obj.basketId === action.payload);
        if(findItem.count > 1) {
            findItem.count--;
        } else {
            state.items = state.items.filter(item => item.basketId !== action.payload);
        }
        basketSlice.caseReducers.calculateTotalPrice(state);
        basketSlice.caseReducers.calculateTotalCountItems(state);
    },

    calculateTotalPrice: (state) => {
        state.totalPrice =  state.items.reduce((sum, item) => sum += item.price * item.count, 0);
    },
    calculateTotalCountItems: (state) => {
        state.totalCountItems =  state.items.reduce((sum, item) => sum += item.count, 0);
    }
  },
})

export const { addItem, removeItem, incrementCount, decrementCount, clearBasket } = basketSlice.actions

export default basketSlice.reducer