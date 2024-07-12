import {create} from 'zustand'

interface createStoreModalStore {
    open : boolean;
    onOpen : ()=>void;
    onClose : ()=>void;
}

const useStoreModal = create<createStoreModalStore>((set)=>({
    open : false,
    onOpen : ()=>set({open:true}),
    onClose : ()=>set({open:false})
}))

export default useStoreModal;