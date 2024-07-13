import React, { useState } from 'react'
import { Store } from '../../types'
import { Link, useParams } from 'react-router-dom'
import { Check, ChevronsUpDown, PlusCircle, StoreIcon } from 'lucide-react'
import { Popover,PopoverTrigger, PopoverContent } from '../ui/popover'
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command'
import { Button } from '../ui/button'
import { cn } from '../lib/utils'
import SeparatorOr from '../separator'
import useStoreModal from '../../hooks/create-store-modal-store'

interface SwitchStoreProps {
  stores : Store[]
}

const SwitchStore:React.FC<SwitchStoreProps> = ({
  stores
}) => {
  const {storeId} = useParams()

  const currentStore = stores && stores.find((store)=>store.id==storeId)

  const [open,setOpen] = useState(false)
  const storeModal = useStoreModal()

  return (
    <>
      <Popover open={open} onOpenChange={setOpen} >
        <PopoverTrigger asChild>
        <Button
            aria-label='Select a store'
            aria-expanded={open}
            role='combobox'
            size={'sm'}
            variant={'outline'}
            className={cn('w-[200px] flex justify-between items-center')}
            >
            <StoreIcon className='h-4 w-4' />
            {currentStore?.name}
            <ChevronsUpDown className='h-4 w-4' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[200px] p-0'>
          <Command >
            <CommandInput placeholder='Search store' />
            <SeparatorOr />
            <CommandList>
              <CommandGroup>

                {
                  stores.map((store)=>(
                    <CommandItem 
                     key={store.id} 
                     >  
                        <Link to={`/${store.id}`} onClick={()=>setOpen(false)}
                        className='w-full flex items-center cursor-pointer justify-between'
                        >
                          <div className='flex items-center'
                          >
                            <StoreIcon className='h-4 w-4 mr-2' />
                            {store.name}
                          </div>
                          <Check className={cn('h-4 w-4 mr-2',currentStore?.name == store.name ? 'opacity-100' : 'hidden')} />
                          </Link>
                    </CommandItem>
                  ))
                }
                
                <CommandItem
                >
                  <div 
                  onClick={storeModal.onOpen}
                  className='flex w-full items-center cursor-pointer'>
                  <PlusCircle className='h-4 w-4 mr-2' />
                  <p>create store</p>
                  </div>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default SwitchStore