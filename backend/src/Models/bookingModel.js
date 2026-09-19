import mongoose from "mongoose";
const bookingSchema=new mongoose.Schema(
    {
     property:{
        type:mongoose.Schema.ObjectId,
        ref:"Property",
        required:[true,"Booking must belong to a property"]
     },
     user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:[true,"Booking must be belong to a user"]

     },
     price:{
        type:Number,
        required:[true,"Booking must have price"]
     },
     createdAt:{
        type:Date,
        default:Date.now
     },
     paid:{
        type:Boolean,
        default:true
     },
     toDate:{
        type:Date,
     },
     guests:{
        type:Number
     },
     numberOfnights:{
        type:Number
     }  
    },
    {timestamps:true}
    
);
bookingSchema.pre(/^find/, function(){
    this.populate("user");
       this.populate({
       path:"property",
       select:"maximumGuest images propertyName address"
    });
    //next();
})
const Booking=mongoose.model("Booking", bookingSchema);
export {Booking};