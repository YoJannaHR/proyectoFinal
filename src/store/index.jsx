import { configureStore } from '@reduxjs/toolkit'
import isLoadingSlice  from './slices/isLoading.slice'
import productsListSlice from './slices/productsList.slice'
import purchasesSlice  from './slices/purchases.slice'
export default configureStore({
    reducer: {
           isLoading : isLoadingSlice,
           productsListSlice: productsListSlice,
           purchases: purchasesSlice
    }
})
