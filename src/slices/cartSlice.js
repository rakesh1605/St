import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-hot-toast"
const initialState={
 totalItems: localStorage.getItem("totalItems")? JSON.parse(localStorage.getItem("totalItems")):0
};
const cartSlice= createSlice({
  name:"cart",
  initialState: initialState,
  reducers:{
    addToCart: (state,action)=>{
const course =action.payload
const index=state.cart.findIndex((item)=> item._id===course._id)
if(index>=0){
  //if the course is already in the cart dont modify
  toast.error("Course already in Cart")
  return
}
//if the course is not in the cart add it to the cart
state.cart.push(course)
//update the total quanity and price
state.totalItems++
state.total+=course.price 
//update to localstorage
localStorage.setItem("cart",JSON.stringify(state.cart))
localStorage.setItem("total",JSON.stringify(state.total))
localStorage.setItem("totalItems",JSON.stringify(state.totalItems))
//show toast
toast.success("Course added to cart")
    },
    setTotalItems(state,value){
      state.totalItems=value.payload;
    },
     removeFromCart: (state,action)=>{
      const courseId=action.payload
      const index=state.cart.findIndex
      ((item)=>item._id === courseId )
      if(index>=0){
        //if the course is found in the cart, remove it
        state.totalItems--
        state.total-=state.cart[index].price
        state.cart.splice(index,1)
        //update to localstorage
        localStorage.setItem("cart",JSON.stringify(state.cart))
        localStorage.setItem("total",JSON.stringify(state.total))
        localStorage.setItem("totalItems",JSON.stringify(state.totalItems))
        toast.success("Course removed from cart")

      }
     },
     resetCart: (state)=>{
      state.cart=[]
      state.total=0
      state.totalItems=0
      //update to localstorage
      localStorage.removeItem("cart")
      localStorage.removeItem("total")
      localStorage.removeItem("totalItems")
     },
   
    //
  },
});
export const {addToCart,removeFromCart,resetCart} =cartSlice.actions;
export default cartSlice.reducer;