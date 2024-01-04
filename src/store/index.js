import billReducers from './modules/billStore.js'
import {  configureStore } from '@reduxjs/toolkit'
const store=configureStore({
    reducer:{
        bill:billReducers
    }
})
export default store