"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { Heading } from "@/components/heading";
import { formSchema } from "./constant";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";



const MusicPage = () => {
    const router = useRouter();
    const [music,setMusic] = useState<string>();
    const proModal = useProModal();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            prompt:""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>)=>{
        try{
            const response = await axios.post("/api/music",values)
            console.log(response)
            setMusic(response.data.audio)
            form.reset();
        } catch(error:any){
            if(error?.response?.status===403){
                proModal.onOpen();
            }else{
                toast.error("Something gone wrong ")
            }
            console.log(error);
        } finally{
            router.refresh();
        }
    };

    return ( 
    <div>
        <Heading 
        title="Music Generator"
        description="Turn your prompt to music"
        />
        <div className="px-4 lg:px-8 mt-4">
            <div>
                <Form
                {...form}
                >
                    <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="rounded-lg border w-full p-2 px-3 md:px-6 grid grid-cols-12 gap-2"
                    >
                    <FormField
                    name="prompt"
                    render={({field})=>(
                        <FormItem className="col-span-12 lg:col-span-10">
                            <FormControl className="m-0 p-0">
                                <Input
                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                disabled={isLoading}
                                placeholder="Piano solo"
                                {...field}
                                />
                            </FormControl>      
                        </FormItem> 
                    )}
                    />
                    <Button className="col-span-12 lg:col-span-2">
                        Generate
                    </Button>
                    </form>
                </Form>
            </div>
            
            <div className="mt-4">
                {isLoading &&(
                    <Loader/>   
                )}
                {music===undefined && !isLoading &&(
                    <Empty label="No music generated" src="/empty.png"/>
                )}
               {music && (
                <audio controls className="w-full mt-8">
                 <source src={music} type="audio/wav"/>
                </audio>
               )}
            </div>
        </div>

    </div> 
    
    );
}
 
export default MusicPage;