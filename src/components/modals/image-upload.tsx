import React, { useCallback, useEffect } from 'react'
import {useDropzone} from 'react-dropzone'
import CustomTransition from '../custom-transition';
import { DownloadIcon, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { storage } from '../../helpers/firebase';
import {nanoid} from 'nanoid'

interface ImageUploadProps {
    setImageUrl : any,
    show : boolean;
    onClose : ()=>void;
    multiple? : boolean;
}

const ImageUpload:React.FC<ImageUploadProps> = ({setImageUrl,show,onClose,multiple = false}) => {

  useEffect(() => {
    const handleEsc = (event:KeyboardEvent) => {
        if (event.key === 'Escape') 
          onClose();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
        window.removeEventListener('keydown', handleEsc);
    };
}, []);

  const onDrop = useCallback(async (acceptedFiles:File[])=> {
    if(!multiple){
      const file = acceptedFiles[0]
      let imageRef = ref(storage,`images/${nanoid()}`)
      await uploadBytes(imageRef,file)
      await getDownloadURL(imageRef).then((url)=>{
        setImageUrl(url)
      })
    } else {
      const images:string[] = []
      acceptedFiles.forEach(async (item)=>{
        let imageRef = ref(storage,`images/${nanoid()}`)
        await uploadBytes(imageRef,item)
        await getDownloadURL(imageRef).then((url)=>{
          images.push(url)
          setImageUrl([...images])
        })  
      })
    }
  },[])

  const {getRootProps,getInputProps,isDragActive} = useDropzone({onDrop})

  return (
    <CustomTransition show={show} duration={100} variant='RoyalBlue' withOverlay>
      <div className={cn('p-8 bg-white relative ring-2 ',isDragActive ? 'border-green-400' : 'border-red-400')}>
        <div className='w-screen bg-neutral-300 sm:w-[500px] flex items-center justify-center h-auto sm:h-auto  ' {...getRootProps()}>
          <div className='w-full p-3 h-full border-neutral-500 cursor-pointer m-1 flex flex-col items-center justify-center border-2 border-dashed'>
            <DownloadIcon className='w-[100px] text-neutral-500 h-[200px]' />
            <p className='text-neutral-500 text-sm'><span className='text-black'>Choose a file</span> or drag it here.</p>
            <input {...getInputProps()} />
          </div>
        </div>
        <X className='h-4 right-10 top-2 cursor-pointer w-4 absolute sm:right-3 sm:top-3' onClick={onClose} />
      </div>
    </CustomTransition>
  )
}

export default ImageUpload



  // useEffect(()=>{

  //   window.addEventListener('click',onClose)

  //   return ()=>{
  //     window.removeEventListener('click',onClose)
  //   }
  // },[])

