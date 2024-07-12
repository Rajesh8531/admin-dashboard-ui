import API from "../helpers/connection"

const getColor = async ({params} :{params:any} ) => {
    
  const {storeId,colorId} = params

  const {data} = await API.get(`/store/${storeId}/colors/${colorId}`)

  return data
}

export default getColor