import { useLoaderData, useNavigate, useParams } from "react-router-dom"
import Container from "../../components/container"
import Layout from "../../components/layout"
import Header from "../../components/ui/header"
import { useEffect, useState } from "react"
import SeparatorOr from "../../components/or-separator"
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
import { productType } from "./produts-home-page"
import CustomSelect from "../../components/ui/custom-select"
import { Category, Color, Image, Size } from "../../types"
import CustomCheckBox from "../../components/custom-checkbox"

const productSchema = z.object({
  imageUrl : z.string().array(),
  name : z.string().min(1),
  price : z.string(),
  categoryId : z.string().min(1),
  sizeId : z.string().min(1),
  colorId : z.string().min(1),
  isFeatured : z.boolean().default(false),
  isArchived : z.boolean().default(false)
})

type schemaType = z.infer<typeof productSchema>

type loaderDataType = {
  product : productType,
  colors : Color[],
  sizes : Size[],
  categories : Category[],
  image : Image[]
}

const ProductCreatePage = () => {

  const navigate = useNavigate()
  const {storeId,productId} = useParams()

  const [openImageUploadModal,setOpenImageUploadModal] = useState(false)
  const [isLoading,setIsLoading] = useState(false)

  const[open,setOpen] = useState(false)

  const data = useLoaderData() as loaderDataType 

   useEffect(()=>{
    if(data?.product == null && productId !== 'new'){
      navigate(`/${storeId}/products/`)
    }
  },[])

  const sizes = data.sizes
  const colors = data.colors
  const categories = data.categories
  const images = data?.product?.image
  const route = data.product ? 'update' : 'create'
  const imageArray = images?.map((image)=>image.url)
  console.log(imageArray)

  const form = useForm<schemaType>({
    resolver : zodResolver(productSchema),
    defaultValues : {
      name : data?.product?.name || '',
      imageUrl : imageArray || [],
      price : data?.product?.price.toString() || '1',
      categoryId : data?.product?.categoryId || '',
      colorId : data?.product?.colorId || '',
      isArchived : data?.product?.isArchived || false,
      isFeatured : data?.product?.isFeatured || false,
      sizeId : data?.product?.sizeId || ''
    }
  })

  const categoryId = form.watch('categoryId')
  const sizeId = form.watch('sizeId')
  const colorId = form.watch('colorId')
  const isFeatured = form.watch('isFeatured')
  const isArchived = form.watch('isArchived')

  const imageUrl = form.watch('imageUrl')

  const setImageUrl =(values:string[])=>{
    form.setValue('imageUrl',values)
    setOpenImageUploadModal(false)
  }
  
  const onCategoryChange = (value : string)=>{
    form.setValue('categoryId',value)
  }

  const isFeaturedOnCheckedChange = (checked:boolean)=>{
    form.setValue('isFeatured',checked)
  }
  const isArchivedOnCheckedChange = (checked:boolean)=>{
    form.setValue('isArchived',checked)
  }

  const onColorChange = (value : string)=>{
    form.setValue('colorId',value)
  }

  const onSizeChange = (value : string)=>{
    form.setValue('sizeId',value)
  }

  const {errors} = form.formState

  const onSubmit =async (data:schemaType)=>{
    try {
      setIsLoading(true)
      if(route === 'update'){
        await API.patch(`/store/${storeId}/products/${productId}`,data)
      } else {
        await API.post(`store/${storeId}/products`,data)
      }
      toast.success(toasterMessage)
      navigate(`/${storeId}/products`)
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const onDelete = async ()=>{
    try {
      setIsLoading(true)
      await API.delete(`store/${storeId}/products/${productId}`)
      navigate(`/${storeId}/products`)
      toast.success("Billboard Deleted")
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const title = data.product ? 'Edit a Product' :'Create Product'
  const description = data.product ? 'Edit Product' : 'Add a new Product'
  const label = data.product ? 'save changes' : 'create'
  const toasterMessage = data.product ? 'Product updated' :'Product Created'

  return (
    <Layout title={`${productId !== 'new' ? 'Update' : 'Create'} Product `}>
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
        <ImageUpload setImageUrl={setImageUrl} multiple show={openImageUploadModal} onClose={()=>setOpenImageUploadModal(false)} />
          <div className="space-y-6 relative">
            <Header title={title} description={description} />
            <SeparatorOr />
            {data.product && <Button onClick={()=>setOpen(true)} className="absolute right-4 top-0" size={'icon'} variant={'destructive'} >
              <Trash className="h-4 w-4" />
            </Button>}           
            <div  className="flex flex-row flex-wrap gap-x-3 gap-y-3">
              {
              imageUrl?.length !== 0 && ( imageUrl?.map((image)=>(
                      <img key={image} src={image} className="w-[200px] h-[200px]"  />
              ))  
              )}
            </div>
            
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <ImageUploadTrigger  disabled={isLoading} onClick={()=>setOpenImageUploadModal(true)}/>
              <SeparatorOr />
              <div className="grid grid-cols-3 gap-3 sm:col-span-1 cols-span-3">
                <Input  disabled={isLoading} show {...form.register('name',{required:true})} errors={errors} label='Name'  placeholder='Product Name' id='name'  />
                <Input  disabled={isLoading} show {...form.register('price',{required:true})} errors={errors} label='Price'  placeholder='Price' id='price' type="number"  />
                <CustomSelect
                data={categories}
                defaultValue={categoryId}
                label="Category"
                onChange={onCategoryChange}
                selectLabel="Category"
                />
                <CustomSelect
                data={sizes}
                defaultValue={sizeId}
                label="Size"
                onChange={onSizeChange}
                selectLabel="Size"
                />
                <CustomSelect
                data={colors}
                defaultValue={colorId}
                label="Color"
                onChange={onColorChange}
                selectLabel="Color"
                />
                <CustomCheckBox
                checked={isFeatured}
                onCheckedChange={isFeaturedOnCheckedChange}
                title="isFeatured"
                description="This products will appear on the home page"
                />
                <CustomCheckBox
                checked={isArchived}
                onCheckedChange={isArchivedOnCheckedChange}
                title="isArchived"
                description="This product will not appear anywhere in the store."
                />
              </div>
              <Button disabled={isLoading} type="submit">{label}</Button>
            </form>
            <SeparatorOr />
          </div>
      </Container>
    </Layout>
  )
}

export default ProductCreatePage