import { Plus } from "lucide-react"
import Container from "../../components/container"
import Layout from "../../components/layout"
import { Button } from "../../components/ui/button"
import Header from "../../components/ui/header"
import { useLoaderData, useNavigate, useParams } from "react-router-dom"
import { BillBoard, Category } from "../../types"
import { DataTable } from "../../components/category/category-table"
import {format} from 'date-fns'
import SeparatorOr from "../../components/separator"
import APIList from "../../components/ui/api-list"
import { categoryColumns } from "../../components/category/category-columns"

type CategoryType = Category & {
  billboard : BillBoard
}

const CategoriesPage = () => {

  const navigate = useNavigate()
  const {storeId} = useParams()

  const categories = useLoaderData() as CategoryType[] 

  const formattedCategories = categories.map((category)=>({
    id : category.id,
    name : category.name,
    billboard_label : category.billboard.label,
    createdAt : format(category.createdAt,'MMMM do, yyyy')
  }))

  const onRoute = ()=>{
    navigate(`/${storeId}/categories/new`)
  }

  return (
    <Layout title="Category">
      <Container className="relative flex flex-col gap-4">
        <Header title="Categories" description="Manage categories for your store" />
        <Button onClick={onRoute} className="absolute right-8 top-11" >
          <Plus className="h-4 w-4 mr-2" />
          <p>Create new</p>
        </Button>
        <DataTable searchKey="name" columns={categoryColumns} data={formattedCategories} />
        <Header title="API" description="API calls for Categories"/>
        <SeparatorOr />
        <APIList
            entityId="categoryId"
            entityName="categories"
            />
      </Container>
    </Layout>
  )
}

export default CategoriesPage