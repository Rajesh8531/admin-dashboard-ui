import { Plus } from "lucide-react"
import Container from "../../components/container"
import Layout from "../../components/layout"
import { Button } from "../../components/ui/button"
import Header from "../../components/ui/header"
import { useLoaderData, useNavigate, useParams } from "react-router-dom"
import { Color } from "../../types"
import {format} from 'date-fns'
import SeparatorOr from "../../components/or-separator"
import APIList from "../../components/ui/api-list"
import { ColorDataTable } from "../../components/colors/color-table"
import { ColorColumns } from "../../components/colors/color-columns"

const ColorsPage = () => {

  const navigate = useNavigate()
  const {storeId} = useParams()

  const colors = useLoaderData() as Color[] 

  const formattedSizes = colors.map((color)=>({
    id : color.id,
    name : color.name,
    value : color.value,
    createdAt : format(color.createdAt,'MMMM do, yyyy')
  }))

  const onRoute = ()=>{
    navigate(`/${storeId}/colors/new`)
  }

  return (
    <Layout title="Color">
      <Container className="relative flex flex-col gap-4">
        <Header title="Colors" description="Manage colors for your store" />
        <Button onClick={onRoute} className="absolute right-8 top-11" >
          <Plus className="h-4 w-4 mr-2" />
          <p>Create new</p>
        </Button>
        <ColorDataTable searchKey="name" columns={ColorColumns} data={formattedSizes} />
        <Header title="API" description="API calls for Colors"/>
        <SeparatorOr />
        <APIList
            entityId="colorId"
            entityName="colors"
            />
      </Container>
    </Layout>
  )
}

export default ColorsPage