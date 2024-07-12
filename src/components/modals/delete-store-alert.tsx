import { useNavigate, useParams } from 'react-router-dom'
import AlertDialog from '../alert-dialog'
import useDeleteStoreModal from '../../hooks/delete-store-hook'
import { useState } from 'react'
import toast from 'react-hot-toast'
import API from '../../helpers/connection'

const DeleteStoreModal = () => {
    const {storeId}= useParams()
    const navigate = useNavigate()

    const useDeleteModal = useDeleteStoreModal()
    const [isLoading,setIsLoading] = useState(false)

    const onClick = async ()=>{
      try {
        setIsLoading(true)
        await API.delete(`/store/${storeId}`)
        toast.success("Store Deleted")
        useDeleteModal.onClose()
        navigate('/create')
      } catch (error) {
        toast.error("Something went wrong")
      } finally {
        setIsLoading(false)
      }
      
    }
    
  return (
    <AlertDialog 
    disabled={isLoading}
    isOpen={useDeleteModal.open}
    onClose={useDeleteModal.onClose}
    title='Are you sure?'
    description='This action cannot be undone'
    onSubmit={onClick}
    variant='destructive'
    >
    </AlertDialog>
  )
}

export default DeleteStoreModal