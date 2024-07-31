import API from "../helpers/connection"

const getBillboards = async ({params} :{params:any} ) => {
    
  const {storeId} = params

  const {data} = await API.get(`/store/${storeId}/billboards`)

  return data || []
}

export default getBillboards