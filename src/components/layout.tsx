import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { cn } from './lib/utils';

interface LayoutProps {
    children : React.ReactNode;
    className? : string;
    title:string;
    description?:string;
    iconPath?:string
}

const Layout:React.FC<LayoutProps> = ({
    children,
    className,
    title,
    description = 'My Page Description',
    iconPath = '/dashboard.svg'
}) => {
  return (
    <>
    <HelmetProvider>
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="icon" href={iconPath} type="image/svg+xml" />
        </Helmet>
        <div  className={cn('w-full',className)}>
            {children}
        </div>
        </HelmetProvider>
    </>
  )
}

export default Layout