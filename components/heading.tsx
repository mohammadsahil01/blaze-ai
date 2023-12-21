
interface HeadingProps {
    title:string;
    description:string
}


export const Heading = ({title,description}:HeadingProps)=>{
    return(
        <>
        <div className="px-4 lg:px-8 flex items-center gap-x-3">
        <div className="">
            <h2 className="text-3xl font-bold">
                {title}
            </h2>
            <p className=" text-md">
                {description}
            </p>
        </div>
        </div>
        
        </>
        
    )
}