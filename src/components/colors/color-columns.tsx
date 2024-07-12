import { ColumnDef } from "@tanstack/react-table"
import toast from "react-hot-toast"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import CellAction from "./color-cell-action"
import { useState } from "react"
import API from "../../helpers/connection"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ColorColumns = {
  name : string
  value : string
  createdAt : string
  id : string
}
 
export const ColorColumns: ColumnDef<ColorColumns>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell : ({row}) => {

      return (<div className="flex gap-2 items-center">
                <p>{row.original.value}</p>
                <div className="p-4 rounded-full border" style={{backgroundColor : `${row.original.value}`}} />
              </div>)
    }
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
          await API.delete(`store/${storeId}/colors/${row.original.id}`)
          navigate(`/${storeId}/colors`)
          toast.success("Color Deleted")
          onClose()
        } catch (error) {
          toast.error("Something went wrong")
        } finally {
          setIsLoading(false)
        }
      }

      const onClose = ()=>{
        setOpen(false)
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
        onClose={onClose}
        disabled={isLoading}
        onOpen={onOpen}
        />
      )
    }
  }
]