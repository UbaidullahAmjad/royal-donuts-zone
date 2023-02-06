import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reducer from '../combineReducer'

const middleware = [thunk]

const persistConfig = {
    key: 'persist-store',
    storage,
    whitelist: ['addItems', 'removeItems', 'myProductsCart', 'checkoutForm']
}

const persistedReducer = persistReducer(persistConfig, reducer)
const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(...middleware)))
export const persistor = persistStore(store)
export default store;