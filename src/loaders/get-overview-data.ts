import API from "../helpers/connection"
import { Product } from "../types"
import getGraphRevenue from "./get-graph-revenue"
import getProducts from "./get-products"
import getStores from "./get-stores"

const getOverviewData = async ({params} :{params:any} ) => {
    
  const {storeId} = params

  const {data:orders} = await API.get(`/store/${storeId}/orders`)
  const data = getGraphRevenue(orders) || []
  const stores = await getStores() || []
  const products = await getProducts({params}) || []
  const remainingProducts = products?.filter((product:Product)=>product.isArchived===false) || []

  return {orders,stores,remainingProducts,data}
}

export default getOverviewData