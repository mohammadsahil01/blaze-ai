"use client";

import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
  {
    label:"Conversation",
    href:"/conversation"
  },
  {
    label:"Image Generator",
    href:"/image"
  },
  {
    label:"Video Generator",
    href:"/video"
  },
  {
    label:"Music Generator",
    href:"/music"
  },
]




const Dashboard = ()=> {
  const router = useRouter()
  return (
  <div>
    <div className='mb-8 space-y-4'>
      <h2 className='text-2xl md:text-4xl font-bold text-center'>
      Explore the power of AI
      </h2>
      <p className='text-center text-sm md:text-lg'>
        Chat with smartest AI - Experience the power of AI
      </p>
    </div>
    <div className='px-4 md:px-20 lg:px-32 space-y-4'>
        {tools.map((tool)=>(
          <Card onClick={()=>router.push(tool.href)}
           key={tool.href}
          className="p-4 border-gray-200 flex justify-between items-center  hover:shadow-lg transition cursor-pointer"
          >
            <div className="font-semibold">
            {tool.label}
            </div>
            <div>
              
            </div>
            <ArrowRight className=""/>
          
          </Card>
        ))}
    </div>
    

  </div>
    
  )
}

export default Dashboard; 
