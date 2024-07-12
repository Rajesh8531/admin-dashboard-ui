
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import getUser from '../actions/getUser'
import { Store } from '../types'
import CreateStore from '../components/create-store'
import useStoreModal from '../hooks/create-store-modal-store'

const RootPage = () => {

  const user = getUser()
  const navigate = useNavigate()
  const stores = useLoaderData() as Store[]

  const isOpen = useStoreModal(state=>state.open)
  const open = useStoreModal(state=>state.onOpen)

  useEffect(()=>{
    if(!user){
      navigate('/auth')
    } else if (stores?.length > 0){
      navigate(`/${stores[0].id}`)
    } else if(!isOpen) {
      open()
    }
   
  },[isOpen])


  return (
    <>
        <CreateStore />
    </>
  )
}

export default RootPage