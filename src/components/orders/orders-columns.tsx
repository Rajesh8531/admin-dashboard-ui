import { ColumnDef } from "@tanstack/react-table"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderColumn = {
  products : string
  phone : string
  address : string
  totalPrice : number
  paid : boolean
  createdAt : string
  id : string
}
 
export const orderColumns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "paid",
    header: "Paid",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  }
]