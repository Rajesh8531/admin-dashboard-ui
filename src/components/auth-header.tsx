import React from 'react'
import { cn } from './lib/utils';

interface HeaderProps {
    title : string;
    description : string;
    center? :boolean;
    titleSize? : string;
}

const Header:React.FC<HeaderProps> = ({
    title,
    description,
    center = true,
    titleSize
}) => {
  return (
    <div className={cn('',center ? 'text-center' : 'text-start',titleSize)}>
        <h1 className='text-lg font-medium'>{title}</h1>
        <p className='text-sm text-neutral-400'>{description}</p>
    </div>
  )
}

export default Header