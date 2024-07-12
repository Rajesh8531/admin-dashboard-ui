import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Copy, Edit, Ellipsis, Trash } from 'lucide-react'
import AlertDialog from '../alert-dialog';

interface CellActionProps {
    onUpdate : ()=>void;
    onCopy : ()=>void;
    onDelete : ()=>void;
    disabled : boolean;
    open : boolean;
    onClose : ()=>void;
    onOpen  : ()=>void;
}

const CellAction:React.FC<CellActionProps> = ({onCopy,onClose,onDelete,onUpdate,disabled,open,onOpen}) => {
  return (
    <>
    <AlertDialog
      description="This action cannot be undone"
      title="Are you sure?"
      disabled={disabled}
      isOpen={open}
      onClose={onClose}
      onSubmit={onDelete}
      variant="destructive"
      />
    <DropdownMenu>
          <DropdownMenuTrigger>
              <Ellipsis className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
          <DropdownMenuLabel >Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onCopy}>
            <Copy className="h-4 w-4 mr-2" />
            <p>Copy Id</p>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onUpdate}>
            <Edit className="h-4 w-4 mr-2" />
            <p>Update</p>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onOpen}>
          <Trash className="h-4 w-4 mr-2" />
          <p>Delete</p>
          </DropdownMenuItem>
          </DropdownMenuContent>
    </DropdownMenu>
  </>
  )
}

export default CellAction