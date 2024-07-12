import { ColumnDef } from "@tanstack/react-table"
import toast from "react-hot-toast"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import CellAction from "./billboard-cell-action"
import { useState } from "react"
import API from "../../helpers/connection"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillboardColumn = {
  label : string
  createdAt : string
  id : string
}
 
export const billboardColumns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey : 'id',
    header : '',
    cell : ({row})=>{

      const onCopy = ()=>{
        navigator.clipboard.writeText(row.original.id)
        toast.success("Id Copied")
      }

      const navigate = useNavigate()
      const {pathname} = useLocation()
      const {storeId} = useParams()

      const onUpdate = ()=>{
        navigate(`${pathname}/${row.original.id}`)
      }

      const [isLoading,setIsLoading] = useState(false)

      const onDelete = async ()=>{
        try {
          setIsLoading(true)
          await API.delete(`store/${storeId}/billboards/${row.original.id}`)
          navigate(`store/${storeId}/billboards`)
          toast.success("Billboard Deleted")
        } catch (error) {
          toast.error("Something went wrong")
        } finally {
          setIsLoading(false)
        }
      }

      const [open,setOpen] = useState(false)

      const onOpen = ()=>{
        setOpen(true)
      }

      return (

        <CellAction
        onCopy={onCopy}
        onUpdate={onUpdate}
        onDelete={onDelete}
        open={open}
        onClose={()=>setOpen(false)}
        disabled={isLoading}
        onOpen={onOpen}
        />
      )
    }
  }
]