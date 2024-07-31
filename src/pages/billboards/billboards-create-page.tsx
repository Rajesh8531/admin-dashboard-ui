import { useLoaderData, useNavigate, useParams } from "react-router-dom"
import Container from "../../components/container"
import Layout from "../../components/layout"
import Header from "../../components/ui/header"
import { useEffect, useState } from "react"
import { BillBoard } from "../../types"
import SeparatorOr from "../../components/separator"
import Input from "../../components/input/input"
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import ImageUploadTrigger from "../../components/image-upload-trigger"
import { Button } from "../../components/ui/button"
import ImageUpload from "../../components/modals/image-upload"
import toast from "react-hot-toast"
import API from "../../helpers/connection"
import AlertDialog from "../../components/alert-dialog"
import { Trash } from "lucide-react"

const billboardSchema = z.object({
  imageUrl : z.string().min(5),
  label : z.string().min(3)
})

type schemaType = z.infer<typeof billboardSchema>

const BillboardCreatePage = () => {

  const navigate = useNavigate()
  const {storeId,billboardId} = useParams()

  const [openImageUploadModal,setOpenImageUploadModal] = useState(false)
  const [isLoading,setIsLoading] = useState(false)

  useEffect(()=>{
    if(data == null && billboardId !== 'new'){
      navigate(`/${storeId}/billboards/`)
    }
  },[])

  const[open,setOpen] = useState(false)

  const data = useLoaderData() as BillBoard | null
  const route = data ? 'update' : 'create'

  const form = useForm<schemaType>({
    resolver : zodResolver(billboardSchema),
    defaultValues : {
      label : data?.label || '',
      imageUrl : data?.imageUrl || ''
    }
  })

  const imageUrl = form.watch('imageUrl')
  const setImageUrl = (value:string)=>{
    form.setValue('imageUrl',value)
    setOpenImageUploadModal(false)
  }

  const {errors} = form.formState

  const onSubmit =async (data:schemaType)=>{
    try {
      setIsLoading(true)
      if(route === 'update'){
        await API.patch(`/store/${storeId}/billboards/${billboardId}`,data)
      } else {
        await API.post(`store/${storeId}/billboards`,data)
      }
      toast.success(toasterMessage)
      navigate(`/${storeId}/billboards`)
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const onDelete = async ()=>{
    try {
      setIsLoading(true)
      await API.delete(`store/${storeId}/billboards/${billboardId}`)
      navigate(`/${storeId}/billboards`)
      toast.success("Billboard Deleted")
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const title = data ? 'Edit a billboard' :'Create billboard'
  const description = data ? 'Edit billboard' : 'Add a new billboard'
  const label = data ? 'save changes' : 'create'
  const toasterMessage = data ? 'Billboard updated' :'Billboard Created'

  return (
    <Layout title='Billboard'>
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
        <ImageUpload setImageUrl={setImageUrl} show={openImageUploadModal} onClose={()=>setOpenImageUploadModal(false)} />
          <div className="space-y-6 relative">
            <Header title={title} description={description} />
            <SeparatorOr />
            {data && <Button onClick={()=>setOpen(true)} className="absolute right-4 top-0" size={'icon'} variant={'destructive'} >
              <Trash className="h-4 w-4" />
            </Button>}
            { imageUrl && <div className="flex flex-row gap-x-3">
                <img src={imageUrl} className="w-[200px] h-[200px]"  />
            </div>}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <ImageUploadTrigger  disabled={isLoading} onClick={()=>setOpenImageUploadModal(true)}/>
              <SeparatorOr />
              <div className="grid grid-cols-3 sm:col-span-1 cols-span-3">
                <Input  disabled={isLoading} show {...form.register('label',{required:true})} errors={errors} label='Label'  placeholder='Billboard Label' id='label'  />
              </div>
              <Button disabled={isLoading} type="submit">{label}</Button>
            </form>
            <SeparatorOr />
          </div>
      </Container>
    </Layout>
  )
}

export default BillboardCreatePage