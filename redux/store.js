// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themesSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});