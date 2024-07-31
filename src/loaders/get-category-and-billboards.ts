import API from "../helpers/connection"

const getCategoryAndBillboard = async ({params} :{params:any} ) => {
    
  const {storeId,categoryId} = params

  const {data : category} = await API.get(`/store/${storeId}/categories/${categoryId}`)
  const {data : billboards} = await API.get(`/store/${storeId}/billboards`) || []

  return {category,billboards}
}

export default getCategoryAndBillboard