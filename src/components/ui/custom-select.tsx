import React from 'react'
import { Select, SelectTrigger,SelectValue,SelectGroup,SelectLabel,SelectItem, SelectContent } from './select'
import { Category, Color, Size } from '../../types';

interface CustomSelectProps {
    defaultValue : string;
    data : Category[] | Color[] | Size[];
    onChange : (value:string)=>void;
    label : string;
    selectLabel : string;
}

const CustomSelect:React.FC<CustomSelectProps> = ({onChange,defaultValue,data,label,selectLabel}) => {
  return (
    <div className='space-y-[0.7em]'>
        <p className='text-sm'>{label}</p>
        <Select onValueChange={onChange} defaultValue={defaultValue}>
            <SelectTrigger>
                <SelectValue placeholder={`Select a ${label}`} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{selectLabel}</SelectLabel>
                    {data?.map((billboard)=>(
                        <SelectItem
                        key={billboard.id}
                        value={billboard.id}>{billboard.name}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    </div>
)
}

export default CustomSelect