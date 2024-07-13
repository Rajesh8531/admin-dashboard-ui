
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useEffect, useState} from 'react'
import getUser from '../actions/getUser'
import { Store } from '../types'
import useStoreModal from '../hooks/create-store-modal-store'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import API from '../helpers/connection'
import toast from 'react-hot-toast'
import AlertDialog from '../components/alert-dialog'
import Input from '../components/input/input'

const storeSchema = z.object({
  name : z.string().min(1),
})

type storeType = z.infer<typeof storeSchema>

const RootPage = () => {

  const user = getUser()
  const navigate = useNavigate()
  const stores = useLoaderData() as Store[]

  const [isLoading,setIsLoading] = useState(false)
    
    const storeModal = useStoreModal()
    
    const form = useForm<storeType>({
      resolver : zodResolver(storeSchema),
      defaultValues : {
        name : ''
      }
    })

    const onSubmit = async (values:storeType)=>{
      try {
        setIsLoading(true)
         await API.post('store/',values)
        storeModal.onClose()
        toast.success("Store created")
        navigate('/')
      } catch (error) {
        toast.error("Something went wrong") 
      } finally {
        setIsLoading(false)
      }
    }

    const {errors} = form.formState

  useEffect(()=>{
    if(!user){
      navigate('/auth')
    } else if (stores?.length > 0 ){
        navigate(`/${stores[0].id}`)
    } 
  },[])
  
  return (
    <AlertDialog  isOpen={true} title='Create store'  disabled={isLoading} onClose={storeModal.onClose} onSubmit={form.handleSubmit(onSubmit)} description='Add a new store to manage products and categories' >
        <p className='text-emerald-500 text-sm'>Please create a store!</p>
        <Input {...form.register('name',{required:true})} errors={errors} label='Name'  placeholder='E-commerce' disabled={isLoading} id='name' />
    </AlertDialog>
  )
}

export default RootPage