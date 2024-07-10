import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzas',
    async (payload) => {
      const { sortBy, order, page, limit = 8, categoryId = 0, searchValue = false } = payload;
      const data = {};
      const resItems = await  axios
        .get('https://63b8a45c6f4d5660c6db90ab.mockapi.io/items', {
          params: {
            sortBy,
            order,
            page,
            limit,
            ...(categoryId > 0 ? { category: categoryId } : {}),
            ...(searchValue ? { search: searchValue } : {}),
          },
        });
        data.items = resItems.data;
        const resTotalCount = await axios.get(
          'https://63b8a45c6f4d5660c6db90ab.mockapi.io/items',
          {
            params: {
              sortBy,
              order,
              ...(categoryId > 0 ? { category: categoryId } : {}),
              ...(searchValue ? { search: searchValue } : {}),
            },
          },
        );
        data.totalCountItems = Math.ceil(resTotalCount.data.length / limit);
        return data;
    },
  );

const initialState = {
  pizzas: [],
  totalCountPage: 1,
  status: 'loading', // loading | error |success
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.pizzas = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = 'loading';
      state.pizzas = [];
      console.log(state)
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = 'success';
      state.pizzas = action.payload.items;
      state.totalCountPage = action.payload.totalCountItems;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = 'error';
      state.pizzas = [];
    });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
