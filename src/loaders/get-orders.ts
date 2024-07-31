import API from "../helpers/connection"

const getOrders = async ({params} :{params:any} ) => {
    
  const {storeId} = params

  const {data} = await API.get(`store/${storeId}/orders`)

  return data || []
}

export default getOrders