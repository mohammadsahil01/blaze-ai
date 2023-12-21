import { create } from "zustand";

interface useProModalStore {
    isOpen:boolean;
    onOpen:()=>void;
    onclose:()=>void;
}

export const useProModal = create<useProModalStore>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onclose:()=>set({isOpen:false})
}))