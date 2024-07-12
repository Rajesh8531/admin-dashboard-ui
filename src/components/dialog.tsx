import React from 'react'
import {DialogBackdrop,DialogPanel,Dialog} from '@headlessui/react'

interface DialogProps {
    isOpen : boolean;
    onClose : ()=>void;
    overlay? : boolean;
    children? : React.ReactNode
}

const DialogComponent:React.FC<DialogProps> = ({
    onClose,
    isOpen,
    overlay,
    children
}) => {

  // useEffect(() => {
  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     if (event.key === 'Escape') {
  //       console.log("Key pressed")
  //       onClose()
  //     }
  //   };

  //   document.addEventListener('keydown', handleKeyDown);

  //   return () => {
  //     document.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, [isOpen]);
  
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        {overlay && <DialogBackdrop className="fixed inset-0 bg-black/50" />}
        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <DialogPanel>
            {children}
          </DialogPanel>
        </div>
    </Dialog>
  )
}

export default DialogComponent