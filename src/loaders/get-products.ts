import API from "../helpers/connection"

const getProducts = async ({params} :{params:any} ) => {
    
  const {storeId} = params

  const {data} = await API.get(`store/${storeId}/products`)

  console.log(data)
  return data || []
}

export default getProducts