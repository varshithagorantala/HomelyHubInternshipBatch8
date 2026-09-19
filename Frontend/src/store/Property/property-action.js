import {propertyAction} from  "./property-slice";
import { axiosInstance } from "../../utils/axios";
export const getAllProperties =() => async(dispatch,getState)=>{
    try{
        console.log("API call started");
        dispatch(propertyAction.getRequest())
        const {searchParams}=getState().properties
        console.log(searchParams)
        const response=await axiosInstance.get(`/v1/rent/listing`,{
            params:{...searchParams}
        })
        if(!response){
            throw new Error("could not fetch any properties")
        }
        const {data}=response;
        console.log(data);
        dispatch(propertyAction.getProperties(data))
    }catch(error){
        dispatch(propertyAction.getError(error.message))
    }
}