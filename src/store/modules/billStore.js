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
        },
        addBillList(state,actions){
            state.billList.push(actions.payload)
        }
    }
})
const {setBillList,addBillList} =billStore.actions

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
//添加billStore
const addBillLists=(data)=>{
    return async (dispatch)=>{
        let res=await axios.post('http://localhost:8888/ka',data)
        dispatch(addBillList(res.data))
    }
}

const reducer=billStore.reducer
export {getBillList,addBillLists}
export default reducer