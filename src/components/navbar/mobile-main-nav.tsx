import { Fragment, useState } from "react";
import { Button } from "../ui/button";
import {  MenuIcon, X } from "lucide-react";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

interface MobileMainNavProps {
    routes : {label:string;href:string;active:boolean}[]
}

const MobileMainNav:React.FC<MobileMainNavProps> = ({routes}) => {

    const [isMenuOpen,setIsMenuOpen] = useState(false)
    const closeMenu = ()=>setIsMenuOpen(false)
    const openMenu = ()=>setIsMenuOpen(true)

  return (
    <div className="flex justify-end flex-1 mr-4 md:hidden">
        <Button onClick={openMenu} variant={'outline'} className="p-3 ouline-none rounded-full">
            <MenuIcon className="h-4 w-4 " />
        </Button>
        <Transition show={isMenuOpen} appear as={Fragment}>
            <Dialog onClose={closeMenu}>
                <div className="fixed inset-0 bg-black/20" />
                <DialogPanel className="fixed right-0 inset-y-0 z-40 overflow-y-auto">
                    <div className="flex relative justify-start items-center w-full h-full ">
                            <TransitionChild as={Fragment}
                                enter='ease-out duration-200'
                                enterFrom='opacity-0 translate-x-full'
                                enterTo='opacity-100 translate-x-0'
                                leave='ease-in duration-100'
                                leaveFrom='opacity-100 translate-x-0'
                                leaveTo='opacity-0 translate-x-full'>
                                    <div className="w-[250px] h-full p-8 bg-white">
                                        <Button onClick={closeMenu} className="absolute right-4 top-4 p-2" variant={'outline'}>
                                            <X className="w-5 h-5" />
                                        </Button>
                                        <div className="flex flex-col gap-y-6">
                                        {
                                            routes.map((route)=>(
                                                <Link
                                                onClick={closeMenu}
                                                key={route.label}
                                                to={route.href}
                                                className={cn('font-medium ',route.active ? 'text-black' : 'text-neutral-400')}
                                                >
                                                    {route.label}
                                                </Link>
                                            ))
                                        }
                                        </div>
                                    </div>
                            </TransitionChild>
                    </div>
                </DialogPanel>
            </Dialog>
        </Transition>
    </div>
  )
}

export default MobileMainNav