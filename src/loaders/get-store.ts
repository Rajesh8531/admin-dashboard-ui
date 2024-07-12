import API from "../helpers/connection"
import getUser from "../actions/getUser"



const getStore = async ({params} :{params:any} ) => {
    
  const user = getUser()
  if(!user){
    return null
  }
  const {data} = await API.get(`/store/${params.storeId}`)

  return data
}

export default getStore