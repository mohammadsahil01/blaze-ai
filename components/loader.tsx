import Image from "next/image";

export const Loader = ()=>{
    return(
        <div className= "flex items-center justify-center p-5 bg-muted rounded-lg">
            <div className=" w-12 h-12 rounded-full animate-spin">
                <Image width="200" height="200" src="/logo.png" alt="loading" className="flex"/>
            </div>
        </div>
    )
}