import { Plus } from "lucide-react"
import Container from "../../components/container"
import Layout from "../../components/layout"
import { Button } from "../../components/ui/button"
import Header from "../../components/ui/header"
import { useLoaderData, useNavigate, useParams } from "react-router-dom"
import { Size } from "../../types"
import {format} from 'date-fns'
import SeparatorOr from "../../components/separator"
import APIList from "../../components/ui/api-list"
import { SizeDataTable } from "../../components/sizes/size-table"
import { sizeColumns } from "../../components/sizes/size-columns"

const SizesPage = () => {

  const navigate = useNavigate()
  const {storeId} = useParams()

  const sizes = useLoaderData() as Size[] 

  const formattedSizes = sizes.map((size)=>({
    id : size.id,
    name : size.name,
    value : size.value,
    createdAt : format(size.createdAt,'MMMM do, yyyy')
  }))

  const onRoute = ()=>{
    navigate(`/${storeId}/sizes/new`)
  }

  return (
    <Layout title="Category">
      <Container className="relative flex flex-col gap-4">
        <Header title="Sizes" description="Manage sizes for your store" />
        <Button onClick={onRoute} className="absolute right-8 top-11" >
          <Plus className="h-4 w-4 mr-2" />
          <p>Create new</p>
        </Button>
        <SizeDataTable searchKey="name" columns={sizeColumns} data={formattedSizes} />
        <Header title="API" description="API calls for Sizes"/>
        <SeparatorOr />
        <APIList
            entityId="sizeId"
            entityName="sizes"
            />
      </Container>
    </Layout>
  )
}

export default SizesPage