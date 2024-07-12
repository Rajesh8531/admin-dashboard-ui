import { useState } from 'react'
import AlertDialog from './alert-dialog'
import Input from './input/input'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import API from '../helpers/connection'
import { useNavigate } from 'react-router-dom'
import useStoreModal from '../hooks/create-store-modal-store'

const billboardSchema = z.object({
  name : z.string().min(1),
})

type billboardType = z.infer<typeof billboardSchema>

const CreateStoreModal = ({
}) => {

    const [isLoading,setIsLoading] = useState(false)
    const navigate = useNavigate()
    
    const storeModal = useStoreModal()
    
    const form = useForm<billboardType>({
      resolver : zodResolver(billboardSchema),
      defaultValues : {
        name : ''
      }
    })

    const onSubmit = async (values:billboardType)=>{
      try {
        setIsLoading(true)
         await API.post('store/',values)
        navigate(`/create`)
        storeModal.onClose()
        toast.success("Store created")
      } catch (error) {
        toast.error("Something went wrong") 
      } finally {
        setIsLoading(false)
      }
    }

    const {errors} = form.formState

  return (
    <AlertDialog  isOpen={storeModal.open} title='Create store'  disabled={isLoading} onClose={storeModal.onClose} onSubmit={form.handleSubmit(onSubmit)} description='Add a new store to manage products and categories' >
        <Input {...form.register('name',{required:true})} errors={errors} label='Name'  placeholder='E-commerce' disabled={isLoading} id='name' />
    </AlertDialog>
  )
}

export default CreateStoreModal