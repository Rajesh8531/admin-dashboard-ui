import {create} from 'zustand'

interface DeleteStore {
    open : boolean;
    onOpen : ()=>void;
    onClose : ()=>void;
}

const useDeleteStoreModal = create<DeleteStore>((set)=>({
    open : false,
    onOpen : ()=>set({open:true}),
    onClose : ()=>set({open:false})
}))

export default useDeleteStoreModal;