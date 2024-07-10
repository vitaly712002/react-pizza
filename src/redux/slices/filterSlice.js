import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categoryId: 0,
    currentPage: 1,
    searchValue: '',
    activeSort: {
        name: 'цене',
        sortProperty: 'price',
    }
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.activeSort = action.payload.activeSort;
      state.searchValue = action.payload.searchValue;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = action.payload.categoryId ? Number(action.payload.categoryId) : initialState.categoryId;
      
    },
    setActiveCategory: (state, action) => {
      state.categoryId = action.payload
    },
    setActiveSort: (state, action) => {
        state.activeSort = action.payload
    },
    setTotalCountPage: (state, action) => {
      state.totalCountPage = action.payload
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload
    }
  },
})

export const { setFilter, setActiveCategory, setActiveSort, setTotalCountPage, setCurrentPage, setSearchValue } = filterSlice.actions

export default filterSlice.reducer