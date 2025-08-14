import { combineReducers, configureStore } from "@reduxjs/toolkit";
import  UserSlice, { loadTokenFromStorage }  from "./slice/user.slice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    user:UserSlice
})

const persistConfig = {
  key: 'protectia',
  storage,
  whitelist: ['user'], // seules ces slices seront persistées
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            
        )
})
store.dispatch(loadTokenFromStorage())

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch