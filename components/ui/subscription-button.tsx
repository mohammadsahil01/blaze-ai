"use client";
import { Zap } from "lucide-react"
import { Button } from "./button"
import { useState } from "react"
import axios from "axios"

interface subscriptionButtonProps {
    isPro:boolean,

}

export const SubscriptionButton = async({isPro = false}:subscriptionButtonProps)=> {
    const [loading,setLoading] = useState(false)
    const onClick =async () => {
        try{
            setLoading(true)
            const response = await axios.get("api/stripe");
            window.location.href = response.data.url
        }catch(error){
            console.log("BILLING_ERROR",error)
        }finally{
            setLoading(false)
        }
    }
    
    return(
        <Button variant={isPro?"default":"default"} onClick={onClick} disabled={loading}>
            
            {isPro?"Manage subscription":"Upgrade"}
            {!isPro && <Zap className="w-4 h-4 ml-2 fill-white"/>}
        </Button>
    )
}