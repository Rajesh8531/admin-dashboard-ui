import API from "../helpers/connection"

const getColors = async ({params} :{params:any} ) => {
    
  const {storeId} = params

  const {data} = await API.get(`store/${storeId}/colors`)

  return data
}

export default getColors