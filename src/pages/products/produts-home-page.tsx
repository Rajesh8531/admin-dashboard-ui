import { Plus } from "lucide-react"
import Container from "../../components/container"
import Layout from "../../components/layout"
import { Button } from "../../components/ui/button"
import Header from "../../components/ui/header"
import { useLoaderData, useNavigate, useParams } from "react-router-dom"
import { Category, Color, Image, Product, Size } from "../../types"
import {format} from 'date-fns'
import SeparatorOr from "../../components/separator"
import APIList from "../../components/ui/api-list"
import { ProductDataTable } from "../../components/products/products-table"
import { productColumns } from "../../components/products/products-columns"

export type productType = Product & {
  category : Category,
  size : Size,
  color : Color,
  image : Image[]
}

const ProductHomePage = () => {

  const navigate = useNavigate()
  const {storeId} = useParams()

  const products = useLoaderData() as productType[] 

  const formattedProducts = products.map((product)=>({
    id : product?.id,
    name : product?.name,
    isArchived : product?.isArchived,
    isFeatured : product?.isFeatured,
    category : product?.category?.name,
    size : product?.size?.name,
    color : product?.color?.value,
    createdAt : format(product.createdAt,'MMMM do, yyyy'),
    price : `${product.price}`
  }))

  const onRoute = ()=>{
    navigate(`/${storeId}/products/new`)
  }

  return (
    <Layout title="Product">
      <Container className="relative flex flex-col gap-4">
        <Header title="Products" description="Manage products for your store" />
        <Button onClick={onRoute} className="absolute right-8 top-11" >
          <Plus className="h-4 w-4 mr-2" />
          <p>Create new</p>
        </Button>
        <ProductDataTable searchKey="name" columns={productColumns} data={formattedProducts} />
        <Header title="API" description="API calls for Products"/>
        <SeparatorOr />
        <APIList
            entityId="productId"
            entityName="products"
            />
      </Container>
    </Layout>
  )
}

export default ProductHomePage