import React from "react";
import { cn } from "../lib/utils";

type variant =   'primary' | 'secondary'  

const variantMap : Record<variant,string> = {
    primary : 'text-neutral-600 border hover:bg-neutral-100 border-neutral-300',
    secondary : ' text-white bg-gradient-to-t from-gray-900 to-gray-600',
}

interface AuthButtonProps extends React.HTMLAttributes<HTMLButtonElement>{
    variant? : variant;
    onClick : ()=>void;
    disabled? : boolean;
    type? : 'submit' | 'button';
    children : React.ReactNode;
    className?:string;
}

const AuthButton = React.forwardRef<HTMLButtonElement,AuthButtonProps>(({
    variant = 'primary',
    onClick,
    disabled,
    children,
    className,
    type,
    ...props
},ref)=>{

    const style = variantMap[variant]

    return (
        <button 
        ref={ref} 
        onClick={onClick}
        type={type}
        disabled={disabled}
        {...props}
        className={cn('w-full disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1.5 rounded-md hover:opacity-90 font-semibold',style,className)}
        >
            {children}
        </button>
    )
})

AuthButton.displayName = "AuthButton"

export default AuthButton;