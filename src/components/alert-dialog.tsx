import React from 'react'

import Layout from './layout'
import Header from './auth-header';
import {Button} from './ui/button';

import {X} from 'lucide-react'
import DialogComponent from './dialog';

interface AlertDialogProps {
    title : string;
    description: string;
    onClose : ()=>void;
    onSubmit : ()=>void;
    disabled : boolean;
    children? : React.ReactNode,
    isOpen : boolean;
    variant? : 'default' | 'destructive';
}

const AlertDialog:React.FC<AlertDialogProps> = ({
    title,
    description,
    onClose,
    onSubmit,
    disabled,
    children,
    isOpen,
    variant = 'default'
}) => {

  return (  
            <Layout title={ isOpen ? 'create-store' : 'dashboard'}>
                    <DialogComponent overlay isOpen={isOpen} onClose={onClose}>
                            <div 
                                className={`
                                    w-screen
                                    sm:w-[500px]
                                    h-auto
                                    bg-auto
                                    sm:rounded-xl
                                    transition-all
                                    ease-in
                                    delay-100
                                    duration-200
                                    ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
                            `}>
                                <div className='bg-white relative p-6 sm:rounded-lg'>
                                    <X onClick={onClose} className='absolute right-4 top-4 w-5 h-5 cursor-pointer' />
                                    <div className='flex flex-col space-y-5'>
                                        <Header center={false} title={title} description={description} />
                                        {children}
                                        <div className='flex items-center gap-x-3 justify-end'>
                                            <Button disabled={disabled} onClick={onClose} variant='outline'>Cancel</Button>
                                            <Button disabled={disabled} variant={variant} onClick={onSubmit}>Continue</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogComponent>
            </Layout>
  )
}


export default AlertDialog