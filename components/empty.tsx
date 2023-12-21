import Image from "next/image";
interface EMptyprops {
    label:string;
    src:string
}


export const Empty = ({label,src}:EMptyprops)=>{
    return(
        <>
            <div className="flex items-center justify-center pt-15">
                <Image
                width="250"
                height="250" alt="Empty" src={src}/> 
            </div>
            
            <div className="flex items-center justify-center">
                <p>{label}</p>
            </div>
        </>
    )
}