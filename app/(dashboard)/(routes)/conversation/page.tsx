"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { formSchema } from "./constant";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatCompletionMessage } from "openai/resources/chat/index.mjs";

import { cn } from "@/lib/utils";

import { Heading } from "@/components/heading";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form,
         FormControl,
         FormField,
         FormItem
         } from "@/components/ui/form";

import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";


const ConversationPage = () => {
    const router = useRouter();
    const proModal = useProModal()
    const [messages,setMessages] = useState<ChatCompletionMessage[]>([])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            prompt:""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>)=>{
        
        try{
            const userMessage:ChatCompletionMessage={
                role:"user",
                content:values.prompt
            }

            const newMessages = [...messages,userMessage];

            const response = await axios.post("/api/conversation",{
                "model": "gpt-3.5-turbo",
                "messages":newMessages
            })
            setMessages((current)=>[...current,userMessage,response.data])
            console.log(response.data)
            form.reset()

        } catch(error:any){
            if(error?.response?.status===403){
                proModal.onOpen();
            }else{
                toast.error("Something gone wrong ")
            }
            console.log(error)
        } finally{
            router.refresh()
        }
    };
    return ( 
    <div>
        <Heading 
        title="Conversation"
        description="Our most advanced conversation model"
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
                                placeholder="How to calculate pie value?"
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
                {messages.length ===0 && !isLoading &&(
                    <Empty label="No conversaiton started yet" src="/empty.png"/>
                )}
                <div className="flex flex-col">
                 {messages.map((message)=>(
                    <div key={message.content}
                    className={cn("p-6 w-full flex items-start gap-4 rounded-lg",message.role==="user" ? "bg-white border border-black/10":"bg-muted")}
                    >
                    {message.role==="user" ?<UserAvatar/> :<BotAvatar/>}

                    {message.content}
                    </div>
                 ))}
                </div>
            </div>
        </div>

    </div> 
    
    );
}
 
export default ConversationPage;