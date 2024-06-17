import { configureStore } from '@reduxjs/toolkit';
import intentosReducer from '../context/reducers/intentosReducer';
import paginacionReducer from "./reducers/paginacionReducer.ts";

const store = configureStore({
    reducer: {
        intentos: intentosReducer,
        paginacion: paginacionReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
