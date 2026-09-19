import { configureStore } from "@reduxjs/toolkit";
import propertySlice from "./Property/property-slice";
import propertDetailsSlice from "./PropertyDetails/PropertyDetails-slice";
import userSlice from "./User/user-slice";
import bookingSlice from "./Booking/booking-slice";
import accomodationSlice from "./Accomodation/Accomodation-slice";
import paymentSlice from "./Payment/payment-slice";
const store=configureStore({
    reducer:{
        properties:propertySlice.reducer,
        propertydetails:propertDetailsSlice.reducer,
        user: userSlice.reducer,
        booking:bookingSlice.reducer,
        accomodation:accomodationSlice.reducer,
        payment:paymentSlice.reducer

    }
})
export default store;