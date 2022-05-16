import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { templateReducer } from "./templateSlice";
import { fieldsConfiguratorReducer } from "./fieldsConfiguratorSlice";

export const store = configureStore({
    reducer: {
        userReducer,
        templateReducer, 
        fieldsConfiguratorReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector