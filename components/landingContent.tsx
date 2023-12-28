"use client"
import { useAuth } from "@clerk/nextjs";
import { Butterfly_Kids } from "next/font/google";
import TypewriterComponent from "typewriter-effect";
import { Button } from "./ui/button";



const LandingContent = () => {
    const {isSignedIn} = useAuth()
    return (
         <div className="text-blue-700 font-bold py-36 text-center space-y-5">
            <div className=" text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-4">
                <h1>The best AI Tool for</h1>
            </div> 
            <div className=" text-white text-4xl">
          <TypewriterComponent options={{strings:[
            "Ask AI",
            "Photo Generation",
            "Music Generation"
          ],
          autoStart:true,
          loop:true
          }}/>
            </div>

        <div>
            <Button className="bg-white text-black hover:bg-slate-500 hover:text-white">
                Start Using For Free
            </Button>
        </div>
                
    </div> );
}
 
export default LandingContent