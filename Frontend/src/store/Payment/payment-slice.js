import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentDetails: {
    checkinDate: null,
    checkoutDate: null,
    totalPrice: 0,
    propertyName: "",
    guests: 1,
    nights: 0,
  },
  loading: false,
  error: null,
  orderData: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPaymentDetails: (state, action) => {
      state.paymentDetails = action.payload;
    },

    getCheckoutRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCheckoutSuccess: (state, action) => {
      state.loading = false;
      state.orderData = action.payload;
    },
    getVerifyRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getVerifySuccess: (state) => {
      state.loading = false;
    },
    getError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetPayment: (state) => {
      state.orderData = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const paymentActions = paymentSlice.actions;
export const { setPaymentDetails } = paymentSlice.actions;

export const selectPaymentDetails = (state) => state.payment.paymentDetails;

export const selectPaymentStatus = (state) => ({
  loading: state.payment.loading,
  error: state.payment.error,
  orderData: state.payment.orderData,
});

export default paymentSlice;
