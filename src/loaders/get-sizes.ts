import API from "../helpers/connection"

const getSizes = async ({params} :{params:any} ) => {
    
  const {storeId} = params

  const {data} = await API.get(`store/${storeId}/sizes`)

  return data || []
}

export default getSizes