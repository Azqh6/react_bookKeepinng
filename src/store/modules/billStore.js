import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const billStore=createSlice({
    name:'bill',
    initialState:{
        billList:[]
    },
    reducers:{
        setBillList(state,actions){
            state.billList=actions.payload
        }
    }
})
const {setBillList} =billStore.actions

//异步方法 
//获取billStore
const getBillList=()=>{
    return async(dispatch)=>{
        let res=await axios.get('http://localhost:8888/ka')
        if(!res){
            return
        }
        dispatch(setBillList(res.data)) 
    }
}

const reducer=billStore.reducer
export {getBillList}
export default reducer