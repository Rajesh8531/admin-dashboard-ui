import React from 'react'
import { Button } from './ui/button'

interface AvatarProps {
    url? : string
}

const Avatar:React.FC<AvatarProps> = ({url}) => {
  return (
    <Button className="rounded-full flex-shrink-0 relative flex items-center justify-center p-1 ring-1 ring-neutral-300 " variant={'secondary'}>
        <img src={url || "/placeholder.png"} className="w-8 h-8  rounded-full " alt="" />
    </Button>
  )
}

export default Avatar