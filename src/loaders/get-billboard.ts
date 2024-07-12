import API from "../helpers/connection"

const getBillboard = async ({params} :{params:any} ) => {
    
  const {storeId,billboardId} = params

  const {data} = await API.get(`/store/${storeId}/billboards/${billboardId}`)

  return data
}

export default getBillboard