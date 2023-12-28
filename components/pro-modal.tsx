"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Check } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import { Button } from "./ui/button";

const tools = [
    {
      label:"Conversation",
    },
    {
      label:"Image Generator",
    },
    {
      label:"Video Generator",
    },
    {
      label:"Music Generator",
      href:"/music"
    },
  ]

export const ProModal =()=>{
    const proModal = useProModal();
    const [loading,setLoading]= useState(false)
    const onsubscribe = async()=>{
      try{
        setLoading(true);
        const response = await axios.get("/api/stripe")
        console.log(response)
        window.location.href = response.data.url
      }catch(error){
        console.log(error,"STRIPE_CLIENT_ERROR")
      }
      finally{
        setLoading(false)
      }
    }
    return(
        <div>
            <Dialog open={proModal.isOpen} onOpenChange={proModal.onclose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2 font-bold">
                            <div className="flex items-center gap-x-2 font-bold">
                            Upgrade to Blaze
                            <Badge className="bg-black text-white font-bold py-1 hover:cursor-pointer">PRO</Badge>
                            </div>
                            
                        </DialogTitle>
                        <DialogDescription className="text-center pt-2">
                        {tools.map((tool)=>(
                            <Card key={tool.label}
                            className="p-3 border-black/5 flex items-center justify-between"
                            >
                                <div className=" font-semibold text-sm">
                                {tool.label}
                                 </div>
                                <Check className="text-primary w-5 h-5"/>
                            </Card>
                        ))}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                      onClick={onsubscribe}
                      size="lg" 
                      variant="default"
                      className="w-full">
                        Upgrade
                      </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}