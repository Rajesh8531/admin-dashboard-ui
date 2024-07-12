import React from 'react'
import { Checkbox } from './ui/checkbox';

interface CustomCheckBoxProps {
    checked : boolean;
    onCheckedChange : (checked:boolean)=>void;
    title:string;
    description:string;
}

const CustomCheckBox:React.FC<CustomCheckBoxProps> = ({checked,onCheckedChange,title,description}) => {
  return (
    <div className='flex flex-row space-x-3 space-y-0 rounded-md border p-4'>
        <Checkbox
        checked={checked}
        onCheckedChange={onCheckedChange}
        />
        <div className='space-y-1 leading-none'>
            <p className='text-sm font-semibold'>{title}</p>
            <p className='text-sm text-muted-foreground'>{description}</p>
        </div>
    </div>
  )
}

export default CustomCheckBox