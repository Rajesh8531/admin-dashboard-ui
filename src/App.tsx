import {createBrowserRouter,createRoutesFromElements,Route, RouterProvider} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'

import AuthPage from './pages/auth-page'
import RootPage from './pages/root-page'
import IndexPage from './pages/index-page'
import Navbar from './components/navbar/nav-bar'
import getStores from './loaders/get-stores'
import getStore from './loaders/get-store'
import SettingsPage from './pages/settings-page'
import BillboardPage from './pages/billboards/billboards-home-page'
import BillboardCreatePage from './pages/billboards/billboards-create-page'
import getBillboard from './loaders/get-billboard'
import getBillboards from './loaders/get-billboards'
import getCategories from './loaders/get-categories'
import CategoriesPage from './pages/categories/categories-home-page'
import CategoriesCreatePage from './pages/categories/categories-create-page'
import getCategoryAndBillboard from './loaders/get-category-and-billboards'
import SizesPage from './pages/sizes/sizes-home-page'
import getSizes from './loaders/get-sizes'
import SizesCreatePage from './pages/sizes/sizes-create-page'
import getSize from './loaders/get-size'
import getColors from './loaders/get-colors'
import getColor from './loaders/get-color'
import ColorsPage from './pages/colors/colors-home-page'
import ColorCreatePage from './pages/colors/colors-create-page'
import ProductHomePage from './pages/products/produts-home-page'
import ProductCreatePage from './pages/products/products-create-page'
import Product_with_Colors_Categories_Sizes from './loaders/get-color-size-category-product'
import getProducts from './loaders/get-products'
import OrdersPage from './pages/orders/orders-home-page'
import getOrders from './loaders/get-orders'
import getOverviewData from './loaders/get-overview-data'

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path='/auth' element={<AuthPage />} />
    <Route path='/create' element={<RootPage />} loader={getStores}  />
    <Route path='/' element={<Navbar />} loader={getStores} >
      <Route path=':storeId' element={<IndexPage />} loader={getOverviewData}  />
      <Route path=':storeId/billboards/' >
        <Route index element={<BillboardPage />} loader={getBillboards}  /> 
        <Route path=':billboardId' element={<BillboardCreatePage />} loader={getBillboard}/>
      </Route>
      <Route path=':storeId/categories/'>
        <Route index element={<CategoriesPage />} loader={getCategories} /> 
        <Route path=':categoryId' element={<CategoriesCreatePage />} loader={getCategoryAndBillboard}/>
      </Route>
      <Route path=':storeId/sizes/'>
        <Route index element={<SizesPage />} loader={getSizes} /> 
        <Route path=':sizeId' element={<SizesCreatePage />} loader={getSize}/>
      </Route>
      <Route path=':storeId/colors/'>
        <Route index element={<ColorsPage />} loader={getColors} /> 
        <Route path=':colorId' element={<ColorCreatePage />} loader={getColor}/>
      </Route>
      <Route path=':storeId/products/'>
        <Route index element={<ProductHomePage />} loader={getProducts} /> 
        <Route path=':productId' element={<ProductCreatePage />} loader={Product_with_Colors_Categories_Sizes}/>
      </Route>
        <Route path=':storeId/orders/' element={<OrdersPage />} loader={getOrders} />
        <Route path=':storeId/settings/' element={<SettingsPage />} loader={getStore} />
    </Route>
  </>
  ))

  return (
    <>
      <RouterProvider  router={router} >
        </RouterProvider>
      <Toaster />
    </>
  )
}

export default App

/* 

    const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path='/auth' element={<AuthPage />} />
    <Route path='/create' element={<RootPage />} loader={getStores}  />
      <Route path='/' element={<Navbar />} loader={getStores} >
          <Route path=':storeId/' element={<IndexPage />} loader={getStore} />
          <Route path=':storeId/billboards' element={<div></div>} loader={getStores} />
          <Route path=':storeId/categories' element={<div></div>} loader={getStores} />
          <Route path=':storeId/sizes' element={<div></div>} loader={getStores} />
          <Route path=':storeId/colors' element={<div></div>} loader={getStores} />
          <Route path=':storeId/products' element={<div></div>} loader={getStores} />
          <Route path=':storeId/orders' element={<div></div>} loader={getStores} />
          <Route path=':storeId/settings' element={<SettingsPage />} loader={getStore} />
      </Route>
    
  </>))

*/
