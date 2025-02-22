import { combineReducers } from "redux";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice"
import cartReducer from "../slices/cartSlice"
import courseReducer from "../slices/courseSlice"
import courseinputReducer from "../slices/courseinputSlice"
import layOutReducer from "../slices/layoutslice"
import viewCourseSlice from "../slices/viewCourseSlice"
export const rootReducer = combineReducers({
  auth:authReducer,
  profile:profileReducer,
  cart:cartReducer,
  course:courseReducer,
  courseinput:courseinputReducer,
  layout:layOutReducer,
  viewCourse:viewCourseSlice
})
