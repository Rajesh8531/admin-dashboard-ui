import { Plus } from "lucide-react"
import Container from "../../components/container"
import Layout from "../../components/layout"
import { Button } from "../../components/ui/button"
import Header from "../../components/ui/header"
import { useLoaderData, useNavigate, useParams } from "react-router-dom"
import { BillBoard } from "../../types"
import { DataTable } from "../../components/billboard/billboard-table"
import { billboardColumns } from "../../components/billboard/billboard-columns"
import {format} from 'date-fns'
import SeparatorOr from "../../components/separator"
import APIList from "../../components/ui/api-list"

const BillboardPage = () => {

  const navigate = useNavigate()
  const {storeId} = useParams()

  const billboards = useLoaderData() as BillBoard[] 

  const formattedBillboards = billboards.map((billboard)=>({
    id : billboard.id,
    label : billboard.label,
    createdAt : format(billboard.createdAt,'MMMM do, yyyy')
  }))

  const onRoute = ()=>{
    navigate(`/${storeId}/billboards/new`)
  }

  return (
    <Layout title="Billboard">
      <Container className="relative flex flex-col gap-4">
        <Header title="Billboards" description="Manage billboards for your store" />
        <Button onClick={onRoute} className="absolute right-8 top-11" >
          <Plus className="h-4 w-4 mr-2" />
          <p>Create new</p>
        </Button>
        <DataTable searchKey="label" columns={billboardColumns} data={formattedBillboards} />
        <Header title="API" description="API calls for Billboards"/>
        <SeparatorOr />
        <APIList
            entityId="billboardId"
            entityName="billboards"
            />
      </Container>
    </Layout>
  )
}

export default BillboardPage