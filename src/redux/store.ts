import { configureStore } from '@reduxjs/toolkit';
import newsSlice from './features/news/newsSlice';

export default configureStore({
  reducer: {
    news: newsSlice
  },
})