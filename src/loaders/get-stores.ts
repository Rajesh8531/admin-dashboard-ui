import API from "../helpers/connection"
import getUser from "../actions/getUser"



const getStores = async () => {
  const user = getUser()

  if(!user){
    return null
  }
  
  const {data} = await API.get('store/',{
    params : {
      userId : user.id
    }
  })

  return data
}

export default getStores