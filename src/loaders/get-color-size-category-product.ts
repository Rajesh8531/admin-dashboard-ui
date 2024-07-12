import API from "../helpers/connection"

const Get_product_with_Colors_Categories_Sizes = async ({params} :{params:any} ) => {
    
  const {storeId,productId} = params

  const {data : product} = await API.get(`/store/${storeId}/products/${productId}`)
  const {data} = await API.get(`/store/${storeId}`)

 const {categories ,colors,sizes} = data

  return {product,colors,sizes,categories}
}

export default Get_product_with_Colors_Categories_Sizes