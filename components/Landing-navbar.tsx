"use client";

import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";


export const LandingNavbar = ()=>{
    const {isSignedIn} = useAuth();

    return (
        <nav className="flex items-center justify-between p-6 bg-transparent ">
            <Link href="/" className=" flex items-center">
                <div className="relative h-8 w-8 mr-4">
                <Image
                fill
                src="/logo.png"
                alt="Logo"
                />
                </div>
                <h1 className="text-2xl font-bold text-white">
                    Blaze AI
                </h1>
            </Link>
            <div className="flex items-center gap-x-2">
                <Link href={isSignedIn? "/dashboard":"/sign-up"}>
                    <Button className="bg-white text-black hover:bg-slate-500">
                        Get Started
                    </Button>
                </Link>
            </div>

        </nav>
    )

}