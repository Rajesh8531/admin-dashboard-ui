import { useLoaderData, useNavigate, useParams } from "react-router-dom"
import Container from "../../components/container"
import Layout from "../../components/layout"
import Header from "../../components/ui/header"
import { useEffect, useState } from "react"
import { Color } from "../../types"
import SeparatorOr from "../../components/or-separator"
import Input from "../../components/input/input"
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../../components/ui/button"
import toast from "react-hot-toast"
import API from "../../helpers/connection"
import AlertDialog from "../../components/alert-dialog"
import { Trash } from "lucide-react"

const colorSchema = z.object({
  name : z.string().min(1),
  value : z.string().min(4).regex(/^#/,{
    message : "String must be a valid hex code"
  })
})

type schemaType = z.infer<typeof colorSchema>

const ColorCreatePage = () => {

  const navigate = useNavigate()
  const {storeId,colorId} = useParams()

  const [isLoading,setIsLoading] = useState(false)

  useEffect(()=>{
    if(data == null && colorId !== 'new'){
      navigate(`/${storeId}/colors/`)
    }
  },[])

  const[open,setOpen] = useState(false)

  const data = useLoaderData() as Color | null
  const route = data ? 'update' : 'create'


  const form = useForm<schemaType>({
    resolver : zodResolver(colorSchema),
    defaultValues : {
      name : data?.name || '',
      value : data?.value || ''
    }
  })

  const colorValue = form.watch('value')

  const {errors} = form.formState

  const onSubmit =async (data:schemaType)=>{
    try {
      setIsLoading(true)
      if(route === 'update'){
        await API.patch(`/store/${storeId}/colors/${colorId}`,data)
      } else {
        await API.post(`store/${storeId}/colors`,data)
      }
      toast.success(toasterMessage)
      navigate(`/${storeId}/colors`)
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const onDelete = async ()=>{
    try {
      setIsLoading(true)
      await API.delete(`store/${storeId}/colors/${colorId}`)
      navigate(`/${storeId}/colors`)
      toast.success("Size Deleted")
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const title = data ? 'Edit a Color' :'Create Color'
  const description = data ? 'Edit Color' : 'Add a new Color'
  const label = data ? 'save changes' : 'create'
  const toasterMessage = data ? 'Color updated' :'Color Created'

  return (
    <Layout title={`${colorId !== 'new' ? 'Update' : 'Create'} Color `}>
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
                    <Input  disabled={isLoading} show {...form.register('name',{required:true})} errors={errors} label='Name'  placeholder='Color Name' id='name'  />
                    <div className="flex gap-2 items-center">
                      <Input  disabled={isLoading} show {...form.register('value',{required:true})} errors={errors} label='Value'  placeholder='Color Value' id='value'  />
                      <div className="flex-shrink-0 mt-7 p-4 rounded-full border" style={{backgroundColor : `${colorValue}`}} />
                    </div>
                </div>
              <Button disabled={isLoading} type="submit">{label}</Button>
            </form>
            <SeparatorOr />
          </div>
      </Container>
    </Layout>
  )
}

export default ColorCreatePage