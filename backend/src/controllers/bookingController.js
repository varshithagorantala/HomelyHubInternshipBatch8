import {Property} from "../Models/propertyModel.js"
import {Booking} from "../Models/bookingModel.js"
//create order
const createOrder=async(req,res)=>{
    const {amount,propertyId, fromDate,toDate,guests}=req.body;

    //orderID
    const orderId="order_"+ Date.now();
    res.json({
        success:true,
        message: "Order created Successfully",
        orderId,
        amount,
        propertyId,
        fromDate,
        toDate,
        guests
    })
}

//verify payment
const verifyPayment=async(req,res)=>{
    const{orderId, bookingDetails, forceStatus}=req.body;
    if(forceStatus==="success"){
        const paymentId ="pay_"+ Date.now();
        //save booking
        // const newBooking=await Booking.create({
        //     user: req.user._id,
        //     property: bookingDetails.price,
        //     price:bookingDetails.fromDate,
        //     toDate:bookingDetails.toDate,
        //     guests:bookingDetails.guests,
        //     numberOfnights:bookingDetails.nights,
        //     paid:true


        // });
        const newBooking = await Booking.create({
    user: req.user._id,
    property: bookingDetails.propertyId,  // ✅ Property ID
    price: bookingDetails.price,         // ✅ Price
    fromDate: bookingDetails.fromDate,   // ✅ From date
    toDate: bookingDetails.toDate,       // ✅ To date
    guests: bookingDetails.guests,       // ✅ Guests
    numberOfnights: bookingDetails.nights,
    paid: true
});

        //tell property those dates are taken

        const updatedProperty =await Property.findByIdAndUpdate(
            bookingDetails.propertyId,{
                $push:{
                    currentBookings:{
                        bookingId:newBooking._id,
                        fromDate:bookingDetails.fromDate,
                        toDate:bookingDetails.toDate,
                        userId:req.user._id
                    }
                }
            },
            {new:true}
        );
        res.json({
            success:true,
            message:"Payment successfull, booking confirmed!!",
            paymentId,
            orderId,
            booking:"Payment failed!",
            orderId
        })
        
    }
}

//get my bookings
const getUserBookings=async(req,res)=>{
    try{
        const bookings=await Booking.find({user:req.user._id});
        res.status(200).json({
            status:"success",
            data:{
                bookings

            }
        })
    }catch(error){
        res.status(401).json({
            status:"fail",
            message:error.message
        })
    }
}
//get one  booking details
const getBookingDetails=async(req,res)=>{
    try{
        const bookings=await Booking.findById(req.params.bookingId);
        res.status(200).json({
            status:"success",
            data:{
                bookings
            }
        })
    }catch(error){
        res.status(401).json({
            status:"fail",
            message:error.message
        })
    }
}
export{getBookingDetails,getUserBookings,createOrder,verifyPayment}