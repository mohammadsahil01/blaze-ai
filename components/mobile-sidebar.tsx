"use client";

import { Button } from "@/components/ui/button";
import {Menu} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./sidebar";
import { use, useEffect, useState } from "react";


interface MobileSidebarProps {
    apiLimitCount:number
}
const MobileSidebar = ({apiLimitCount}:MobileSidebarProps) => {

    const [isMounted,setMounted] = useState(false);

    useEffect(()=>{
        setMounted(true)
    },[])

    if(!isMounted){
        return(null)
    }
    return ( 
        <Sheet>
            <SheetTrigger>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>

            <SheetContent side="left" className="p-0">
                <Sidebar apiLimitCount={apiLimitCount}/>
            </SheetContent>
        </Sheet>
         
        
     );
}
 
export default MobileSidebar;