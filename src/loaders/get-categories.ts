import API from "../helpers/connection"

const getCategories = async ({params} :{params:any} ) => {
    
  const {storeId} = params

  const {data} = await API.get(`store/${storeId}/categories`)

  return data || []
}

export default getCategories