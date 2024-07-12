import API from "../helpers/connection"

const getSize = async ({params} :{params:any} ) => {
    
  const {storeId,sizeId} = params

  const {data} = await API.get(`/store/${storeId}/sizes/${sizeId}`)

  return data
}

export default getSize