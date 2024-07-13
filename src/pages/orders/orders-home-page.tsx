import Container from "../../components/container"
import Layout from "../../components/layout"
import Header from "../../components/ui/header"
import { useLoaderData } from "react-router-dom"
import { Order, OrderItem, Product } from "../../types"
import {format} from 'date-fns'
import SeparatorOr from "../../components/separator"
import APIList from "../../components/ui/api-list"
import { OrderTable } from "../../components/orders/orders-table"
import { orderColumns } from "../../components/orders/orders-columns"

type orderItemType = OrderItem & {
  product : Product
}

type loaderDataType = Order & {
  orderItems : orderItemType[]
}

const OrdersPage = () => {

  const orders = useLoaderData() as loaderDataType[]

  const formattedOrders = orders?.map((order)=>({
    id : order.id,
    address : order.address,
    phone : order.phone,
    paid : order.isPaid,
    products : order.orderItems?.map(item=>item.product.name).join(', '),
    totalPrice : order.orderItems?.reduce((total,item)=>{
      return total + Number(item.product.price)
    },0),
    createdAt : format(order.createdAt,'MMMM do, yyyy')
  }))

  /* 
   formattedOrders: {
    id: string;
    address: string;
    phone: string;
    paid: boolean;
    products: string;
    totalPrice: number;
    createdAt: string;
}[] | undefined
  */

  return (
    <Layout title="Orders">
      <Container className="relative flex flex-col gap-4">
        <Header title="Orders" description="Manage orders for your store" />
        <OrderTable searchKey="products" columns={orderColumns} data={formattedOrders} />
        <Header title="API" description="API calls for Orders"/>
        <SeparatorOr />
        <APIList
            entityId="orderId"
            entityName="orders"
        />
      </Container>
    </Layout>
  )
}

export default OrdersPage