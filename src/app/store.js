import { configureStore } from '@reduxjs/toolkit';
import starWarsReducer from '../features/starWars/starWarsSlice';

export default configureStore({
  reducer: {
    starWars: starWarsReducer,
  },
});
