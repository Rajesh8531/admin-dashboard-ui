import React from 'react'
import { cn } from './lib/utils'


interface ContainerProps {
    children : React.ReactNode;
    className? : string;
}
const Container:React.FC<ContainerProps> = ({children,className}) => {
  return (
    <div className={cn('max-w-[2160px] p-8',className)}>
        {children}
    </div>
  )
}

export default Container