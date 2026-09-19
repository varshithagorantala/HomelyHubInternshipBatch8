import {createSlice} from "@reduxjs/toolkit";
const initialState={
    booking:[],
    bookingDetails:{},
    loading:false
}
const bookingSlice=createSlice({
    name:"booking",
    initialState,
    reducers:{
        setBookingRequest(state){
            state.loading=true;
        },
        setBookings(state,action){
            state.bookings=actions.payload;
            state.loading=false;
        },
        addBooking:(state,action)=>{
            state.bookings.push(action.payload);
        },
        setBookingDetails:(state,action)=>{
            state.bookingDetails=action.payload.bookings;
        }
    }
})
export const {setBookings, addBooking,setBookingDetails}=bookingSlice.actions;
export default bookingSlice;