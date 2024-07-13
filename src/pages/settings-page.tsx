import { useState } from "react"
import Container from "../components/container"
import Header from "../components/ui/header"
import Input from "../components/input/input"
import Layout from "../components/layout"
import SeparatorOr from "../components/separator"
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import API, { BASE_URL } from "../helpers/connection"
import toast from "react-hot-toast"
import { useLoaderData, useNavigate, useParams } from "react-router-dom"
import { Store } from "../types"
import { Button } from "../components/ui/button"
import useDeleteStoreModal from "../hooks/delete-store-hook"
import ApiAlert from "../components/ui/api-alert"
import { Trash } from "lucide-react"

const storeSchema = z.object({
  name : z.string().min(1),
})

type schemaType = z.infer<typeof storeSchema>


const SettingsPage = () => {

  const navigate = useNavigate()

  const [isLoading,setIsLoading] = useState(false)
  const {storeId} = useParams()

  const storeData = useLoaderData() as Store

  const form = useForm<schemaType>({
    resolver : zodResolver(storeSchema),
    defaultValues : {
      name : storeData.name || ''
    }
  })

  const useDeleteStore = useDeleteStoreModal()

  const onSubmit = async (values:schemaType)=>{
    try {
      setIsLoading(true)
      await API.patch(`store/${storeId}`,values)
      navigate(0)
      toast.success("Store Updated")
    } catch (error) {
      toast.error("Something went wrong") 
    } finally {
      setIsLoading(false)
    }
  }

  const {errors} = form.formState

  const url = BASE_URL + `store/${storeId}/`

  return (
   <Layout title="Settings">
    <Container className=" relative flex flex-col gap-y-6">
      <Header title="Settings" description="Manage store preferences" />
      <Button onClick={()=>useDeleteStore.onOpen()} disabled={isLoading} variant={'destructive'} className='p-2 absolute right-4 top-4'>
        <Trash className='h-5 w-5' />
      </Button>
      <SeparatorOr />
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-3">
        <div className="space-y-2">
          <Input disabled={isLoading} errors={errors} {...form.register('name',)} placeholder='' id="name" label="Name"  />
          <Button type="submit">
              Save changes
          </Button>
        </div>
      </form>
      <ApiAlert title="API_PUBLIC_API_URL" variant="public" url={url}/>
    </Container>
   </Layout>
  )
}

export default SettingsPage