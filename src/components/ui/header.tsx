import React from 'react'

interface HeaderProps {
    title : string;
    description : string;
}

const Header:React.FC<HeaderProps> = ({title,description}) => {
  return (
    <div className='relative'>
        <h1 className='text-3xl font-semibold'>{title}</h1>
        <p className='text-muted-foreground text-sm'>{description}</p>
    </div>
  )
}

export default Header