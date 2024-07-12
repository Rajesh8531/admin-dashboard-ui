import { ColumnDef } from "@tanstack/react-table"
import toast from "react-hot-toast"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import CellAction from "./products-cell-action"
import { useState } from "react"
import API from "../../helpers/connection"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  name : string
  isArchived : boolean
  isFeatured : boolean
  price : string
  category : string
  size : string
  color : string
  createdAt : string
  id : string
}
 
export const productColumns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell : ({row}) => {

      return (<div className="flex gap-2 items-center">
                <p>{row.original.color}</p>
                <div className="p-4 rounded-full border" style={{backgroundColor : `${row.original.color}`}} />
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
          await API.delete(`store/${storeId}/products/${row.original.id}`)
          navigate(`/${storeId}/products`)
          toast.success("Product Deleted")
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