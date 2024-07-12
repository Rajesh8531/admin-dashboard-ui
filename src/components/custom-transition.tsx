import { Transition, TransitionChild } from '@headlessui/react'
import React from 'react'
import { cn } from './lib/utils';

interface CustomTransitionProps {
    show : boolean;
    children : React.ReactNode;
    withOverlay? : boolean;
    className? : string;
    duration? : number;
    variant? : variant;
    onClose? : ()=>void
}

type variant = 'RoyalBlue' | 'Gray' | 'Red' | 'Default' | 'Yellow' | 'Green' | 'Indigo' | 'Purple' | 'Pink' | 'Blue' | 'SkyBlue' | 'Cyan'

const colorMap : Record<variant,string> = {
    Gray : 'bg-gray-500',
    Red : 'bg-red-500',
    Default : 'bg-black',
    Yellow : 'bg-yellow-500',
    Green : 'bg-green-500',
    Blue : 'bg-blue-500',
    Indigo : 'bg-indigo-500',
    Purple : 'bg-purple-500',
    Pink : 'bg-pink-500',
    SkyBlue : 'bg-sky-500',
    Cyan : 'bg-cyan-500',
    RoyalBlue : 'bg-[#0000FF]'
}

const CustomTransition:React.FC<CustomTransitionProps> = ({
    show,
    children,
    withOverlay,
    className,
    duration = 100,
    variant = 'Default',
}) => {

  return (
    <Transition show={show} appear={show}>
        { withOverlay && (
            <TransitionChild>
                <div className={cn(`fixed  inset-0 z-10 opacity-80`,colorMap[variant])} />
            </TransitionChild>)}
        <TransitionChild as={'div'} 
        className={
        cn(`
            flex
            items-center
            justify-center
            fixed
            inset-0
            z-50
            w-full
        `,className)}
            enter={`duration-${duration} ease-out`}
            enterFrom='opacity-0 scale-0'
            enterTo='opacity-100 scale-95'
            leave={`duration-${duration} ease-in`}
            leaveFrom='opacity-100 scale-95'
            leaveTo='opacity-0 scale-0'
        >
            {children}
        </TransitionChild>
    </Transition>
  )
}

export default CustomTransition