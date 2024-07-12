import React from 'react'
import { Alert, AlertDescription, AlertTitle } from './alert';
import { Copy, Server } from 'lucide-react';
import { Badge, BadgeProps } from './badge';
import toast from 'react-hot-toast';
import { Button } from './button';

type variant = 'public' | 'admin';

interface ApiAlertProps {
    title : string;
    variant : variant;
    url : string;
}

const textMap : Record<variant,string> = {
    public : 'Public',
    admin  : 'Admin'
}

const scopeMap : Record<variant,BadgeProps['variant']> = {
    admin : 'destructive',
    public : 'secondary'
}

const ApiAlert:React.FC<ApiAlertProps> = ({
    title,
    variant,
    url
}) => {

    // const {storeId} = useParams()
    // const url = BASE_URL + `store/${storeId}` + route
    const onCopy = ()=>{
        navigator.clipboard.writeText(url)
        toast.success('Link copied')
    }

  return (
    <Alert >
        <Server className='h-4 w-4 mr-2' />
        <AlertTitle className='flex items-center'>
            {title}
            <Badge className='ml-2' variant={scopeMap[variant]} >{textMap[variant]}</Badge>
        </AlertTitle>
        <AlertDescription className='overflow-auto flex mt-4 items-center justify-between' >
            <code className='text-wrap  relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>
                {url}
            </code>
            <Button
            size={'icon'}
            onClick={onCopy}
            variant={'outline'}
            className='flex-shrink-0'
            >
                <Copy className='h-4 w-4' />
            </Button>
        </AlertDescription>
    </Alert>
  )
}

export default ApiAlert