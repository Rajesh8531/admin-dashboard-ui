import { Link, useLocation, useParams } from 'react-router-dom'
import { cn } from '../lib/utils'
import MobileMainNav from './mobile-main-nav'

const MainNav = () => {

    const {storeId} = useParams()
    const {pathname} = useLocation()

    const routes = [
                        {
                            label : 'Overview',
                            href : `/${storeId}`,
                            active : pathname == `/${storeId}`
                        },
                        {
                            label : 'Billboards',
                            href : `/${storeId}/billboards`,
                            active : pathname.includes(`/${storeId}/billboards`)
                        },
                        {
                            label : 'Categories',
                            href : `/${storeId}/categories`,
                            active : pathname.includes(`/${storeId}/categories`)
                        },
                        {
                            label : 'Sizes',
                            href : `/${storeId}/sizes`,
                            active : pathname.includes(`/${storeId}/sizes`)
                        },
                        {
                            label : 'Colors',
                            href : `/${storeId}/colors`,
                            active : pathname.includes(`/${storeId}/colors`)
                        },
                        {
                            label : 'Products',
                            href : `/${storeId}/products`,
                            active : pathname.includes(`/${storeId}/products`)
                        },
                        {
                            label : 'Orders',
                            href : `/${storeId}/orders`,
                            active : pathname.includes(`/${storeId}/orders`)
                        },
                        {
                            label : 'Settings',
                            href : `/${storeId}/settings`,
                            active : pathname.includes(`/${storeId}/settings`)
                        },
                    ]

  return (
    <>
        <div className='hidden md:flex items-center flex-1 gap-x-4 text-sm px-4'>
            {
                routes.map((route)=>(
                    <Link key={route.label}
                    to={route.href}
                    className={cn('font-medium ',route.active ? 'text-black' : 'text-neutral-400')}
                    >
                        {route.label}
                    </Link>
                ))
            }
        </div>
        <MobileMainNav routes={routes} />
    </>
  )
}

export default MainNav