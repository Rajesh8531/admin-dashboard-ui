import { useLoaderData, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import getUser from '../actions/getUser'
import { FullOrderType, Product, Store } from '../types'

import Layout from '../components/layout'
import Container from '../components/container'
import Header from '../components/ui/header'
import Separator from '../components/separator'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { DollarSign, Package, StoreIcon } from 'lucide-react'
import { formatter } from '../components/lib/utils'
import Overview from '../components/overview'

interface loaderDataType {
  orders : FullOrderType[],
  stores : Store[],
  remainingProducts : Product[],
  data : {name:string;total:number}[]
}

const IndexPage = () => {

  const navigate = useNavigate()
  const user = getUser()
  const {orders,stores,remainingProducts,data} = useLoaderData() as loaderDataType 
  const successfulOrders = orders?.filter((order)=>(order.isPaid == true))

  const totalRevenue = successfulOrders?.reduce((total,order)=>{

    const revenuePerOrder = order.orderItems.reduce((orderSum,orderItem)=>{
      return (orderSum + orderItem.product.price)
    },0)

    return (revenuePerOrder + total)
  },0)

  const salesCount = successfulOrders?.length
  const productCount = remainingProducts?.length
  
  
  useEffect(()=>{

    if(!user){
      navigate('/auth')
    } else if(stores && stores.length == 0){
      navigate(`/create`)
    }
    
  },[])

  return (
    <Layout title='Landing Page'>
      <Container>
        <div className='flex-col'>
          <div className='flex-1 space-y-4'>
            <Header title='Dashboard' description='Overview of your store' />
            <Separator />
            <div className='w-full grid grid-cols-3 gap-4'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between'>
                  <CardTitle> Total Revenue</CardTitle>
                  <DollarSign className='text-muted-foreground h-4 w-4' />
                </CardHeader>
                <CardContent>
                <div className='text-2xl font-bold'>
                    {formatter.format(totalRevenue || 0)}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between'>
                  <CardTitle> Sales</CardTitle>
                  <StoreIcon className='text-muted-foreground h-4 w-4' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>
                    {salesCount || 0}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between'>
                  <CardTitle>Products in Stock</CardTitle>
                  <Package className='text-muted-foreground h-4 w-4' />
                </CardHeader>
                <CardContent>
                <div className='text-2xl font-bold'>
                    +{productCount}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className='col-span-4'>
              <Card>
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                    <Overview data={data} />
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </Container>
    </Layout>
  )
}

export default IndexPage