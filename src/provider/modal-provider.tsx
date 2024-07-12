import { useEffect, useState } from "react"
import CreateStoreModal from "../components/create-store"
import DeleteStoreModal from "../components/modals/delete-store-alert"


const ModalProvider = () => {

  const [mounted,setMounted] = useState(false)

  useEffect(()=>{
    if(!mounted){
      setMounted(true)
    }
  },[])

  if(!mounted){
    return null
  }

  return (
    <>
      <DeleteStoreModal />
      <CreateStoreModal />
    </>
  )
}

export default ModalProvider