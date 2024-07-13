import { useLoaderData, useNavigate, useParams } from "react-router-dom"
import Container from "../../components/container"
import Layout from "../../components/layout"
import Header from "../../components/ui/header"
import { useEffect, useState } from "react"
import { Size } from "../../types"
import SeparatorOr from "../../components/separator"
import Input from "../../components/input/input"
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../../components/ui/button"
import toast from "react-hot-toast"
import API from "../../helpers/connection"
import AlertDialog from "../../components/alert-dialog"
import { Trash } from "lucide-react"

const sizeSchema = z.object({
  name : z.string().min(3),
  value : z.string().min(1)
})

type schemaType = z.infer<typeof sizeSchema>

const SizeCreatePage = () => {

  const navigate = useNavigate()
  const {storeId,sizeId} = useParams()

  const [isLoading,setIsLoading] = useState(false)

  useEffect(()=>{
    if(data == null && sizeId !== 'new'){
      navigate(`/${storeId}/sizes/`)
    }
  },[])

  const[open,setOpen] = useState(false)

  const data = useLoaderData() as Size | null
  const route = data ? 'update' : 'create'


  const form = useForm<schemaType>({
    resolver : zodResolver(sizeSchema),
    defaultValues : {
      name : data?.name || '',
      value : data?.value || ''
    }
  })

  const {errors} = form.formState

  const onSubmit =async (data:schemaType)=>{
    try {
      setIsLoading(true)
      if(route === 'update'){
        await API.patch(`/store/${storeId}/sizes/${sizeId}`,data)
      } else {
        await API.post(`store/${storeId}/sizes`,data)
      }
      toast.success(toasterMessage)
      navigate(`/${storeId}/sizes`)
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const onDelete = async ()=>{
    try {
      setIsLoading(true)
      await API.delete(`store/${storeId}/sizes/${sizeId}`)
      navigate(`/${storeId}/sizes`)
      toast.success("Size Deleted")
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const title = data ? 'Edit a Size' :'Create Size'
  const description = data ? 'Edit Size' : 'Add a new Size'
  const label = data ? 'save changes' : 'create'
  const toasterMessage = data ? 'Size updated' :'Size Created'

  return (
    <Layout title={`${sizeId !== 'new' ? 'Update' : 'Create'} Size `}>
      <AlertDialog
      description="This action cannot be undone"
      title="Are you sure?"
      disabled={isLoading}
      isOpen={open}
      onClose={()=>setOpen(false)}
      onSubmit={onDelete}
      variant="destructive"
      />
      <Container>
          <div className="space-y-6 relative">
            <Header title={title} description={description} />
            {data && <Button onClick={()=>setOpen(true)} className="absolute right-4 top-0" size={'icon'} variant={'destructive'} >
              <Trash className="h-4 w-4" />
            </Button>}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <SeparatorOr />
                <div className="grid grid-cols-3 gap-x-4 sm:col-span-1 cols-span-3">
                    <Input  disabled={isLoading} show {...form.register('name',{required:true})} errors={errors} label='Name'  placeholder='Size Name' id='name'  />
                    <Input  disabled={isLoading} show {...form.register('value',{required:true})} errors={errors} label='Value'  placeholder='Size Value' id='value'  />
                </div>
              <Button disabled={isLoading} type="submit">{label}</Button>
            </form>
            <SeparatorOr />
          </div>
      </Container>
    </Layout>
  )
}

export default SizeCreatePage