import { configureStore, combineReducers } from '@reduxjs/toolkit'
// import userData from '../ProductsReduxSlice/UserSlicer'
import cartItems from '../ProductsReduxSlice/AddToCart'
import UserLoginSlice from '../ProductsReduxSlice/UserLoginSlice'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}
const rootReducer = combineReducers({
    cart: cartItems,
    user: UserLoginSlice,

})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const Store = configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(Store)

export default Store