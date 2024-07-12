import { useLoaderData, useNavigate, useParams } from "react-router-dom"
import Container from "../../components/container"
import Layout from "../../components/layout"
import Header from "../../components/ui/header"
import { useEffect, useState } from "react"
import { BillBoard, Category } from "../../types"
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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../components/ui/select"

const categorySchema = z.object({
  name : z.string().min(3),
  billboardId : z.string().min(3)
})

type schemaType = z.infer<typeof categorySchema>
type CategoryType = Category & {
    billboard : BillBoard
}

type categoryAndBillboards = {
    category : CategoryType,
    billboards : BillBoard[]
}

const CategoriesCreatePage = () => {

  const navigate = useNavigate()
  const {storeId,categoryId} = useParams()

  const [isLoading,setIsLoading] = useState(false)

  useEffect(()=>{
    if(data == null && categoryId !== 'new'){
      navigate(`/${storeId}/categories/`)
    }
  },[])

  const[open,setOpen] = useState(false)

  const data = useLoaderData() as categoryAndBillboards | null
  const category = data?.category
  const billboards = data?.billboards
  const route = data?.category ? 'update' : 'create'


  const form = useForm<schemaType>({
    resolver : zodResolver(categorySchema),
    defaultValues : {
      name : category?.name || '',
      billboardId : category?.billboardId || ''
    }
  })

  const setValue = form.setValue

  const onChange = (value:string)=>{
    setValue('billboardId',value)
  }

  const {errors} = form.formState

  const onSubmit =async (data:schemaType)=>{
    try {
      setIsLoading(true)
      if(route === 'update'){
        await API.patch(`/store/${storeId}/categories/${categoryId}`,data)
      } else {
        await API.post(`store/${storeId}/categories`,data)
      }
      toast.success(toasterMessage)
      navigate(`/${storeId}/categories`)
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const onDelete = async ()=>{
    try {
      setIsLoading(true)
      await API.delete(`store/${storeId}/categories/${categoryId}`)
      navigate(`/${storeId}/categories`)
      toast.success("Billboard Deleted")
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const title = data?.category ? 'Edit a Category' :'Create Category'
  const description = data?.category ? 'Edit Category' : 'Add a new Category'
  const label = data?.category ? 'save changes' : 'create'
  const toasterMessage = data?.category ? 'Category updated' :'Category Created'

  return (
    <Layout title={`${categoryId !== 'new' ? 'Update' : 'Create'} Category `}>
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
            {data?.category && <Button onClick={()=>setOpen(true)} className="absolute right-4 top-0" size={'icon'} variant={'destructive'} >
              <Trash className="h-4 w-4" />
            </Button>}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <SeparatorOr />
                <div className="grid grid-cols-3 gap-x-4 sm:col-span-1 cols-span-3">
                    <Input  disabled={isLoading} show {...form.register('name',{required:true})} errors={errors} label='Name'  placeholder='Billboard Label' id='label'  />
                    <div className="space-y-[0.7em]">
                        <p className="text-sm">Billboard</p>
                        <Select onValueChange={onChange} defaultValue={category?.billboard.id}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a billboard" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Billboards</SelectLabel>
                                    {billboards?.map((billboard)=>(
                                        <SelectItem
                                        key={billboard.id}
                                        value={billboard.id}>{billboard.label}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
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

export default CategoriesCreatePage