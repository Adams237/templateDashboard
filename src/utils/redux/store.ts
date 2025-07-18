import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserSlice, { loadTokenFromStorage } from "./slice/user.slice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage


const rootReducer = combineReducers({
    user: UserSlice,
});

const persistConfig = {
  key: 'root',
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

// persistor pour déclencher la réhydratation
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch