import React from 'react'
import { Button } from './ui/button';
import { ImagePlus } from 'lucide-react';

interface ImageUploadTriggerProps {
    onClick : ()=>void;
    disabled : boolean;
}

const ImageUploadTrigger:React.FC<ImageUploadTriggerProps> = ({onClick,disabled}) => {
  return (
    <div className='space-y-2 text-sm'>
        <p className='font-semibold'>Background Image</p>
        <Button 
        type='button'
        onClick={onClick}
        disabled={disabled}
        className='w-fill' variant={'secondary'}>
            <ImagePlus className='h-4 w-4 mr-2' />
            <p>Upload an image</p>
        </Button>
    </div>
  )
}

export default ImageUploadTrigger