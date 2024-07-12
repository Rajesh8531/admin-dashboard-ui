import React from 'react'
import { cn } from '../lib/utils';
import { FieldErrors } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?:string;
    placeholder:string;
    label?:string;
    disabled? : boolean;
    type? : string;
    errors : FieldErrors;
    id:string;
    show? : boolean
}

const Input = React.forwardRef<HTMLInputElement,InputProps>(({
  placeholder,
  className,
  label,
  disabled,
  type = 'text' ,
  errors,
  id,
  show = false,
  ...props
},ref)=>{
    return (
        <div  className='space-y-2 flex flex-col w-full'>
            <label className={cn('text-sm font-medium',errors[id] && 'text-red-500')} htmlFor={id} >{label}</label>
            <input {...props} id={id} ref={ref} type={type} placeholder={show ? placeholder : '' } disabled={disabled} 
            className={cn('rounded-lg px-3 py-2 font-normal disabled:opacity-50 disabled:cursor-not-allowed border focus:outline-none outline-none border-neutral-300 transition-all duration-100 focus:ring-[3px] hover:border-neutral-500 focus:ring-neutral-300',className,errors[id] && 'border-red-500 ring-red-500')}
            />
            {errors[id] && <p className='text-sm text-red-500' >{errors[id].message as string}</p>}
        </div>
    )
})

Input.displayName = 'Input'

export default Input