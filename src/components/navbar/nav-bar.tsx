import { useEffect } from "react"
import getUser from "../../actions/getUser"
import SwitchStore from "./switch-store"
import { Outlet, useLoaderData, useNavigate } from "react-router-dom"
import { Store } from "../../types"
import ModalProvider from "../../provider/modal-provider"
import SignoutButton from "../signout-button"
import MainNav from "./main-nav"

const Navbar = () => {

    const user = getUser()
    const navigate = useNavigate()
    const stores = useLoaderData() as Store[] 
    
    useEffect(()=>{
        if(!user){
            navigate('/auth')
        } else if (stores.length == 0){
            navigate('/create')
        } else {
            navigate(`/${stores[0].id}`)
        }
    },[])
    
    if(!user){
        return null
    }

  return (
    <>
    <ModalProvider />
        <div className="h-16 border-b px-4 sm:px-6 lg:px-6 ">
            <div className="h-full flex justify-between items-center">
                <SwitchStore stores={stores} />
                <MainNav />
                <SignoutButton  />
            </div>
        </div>
    <Outlet />
    </>
  )
}

export default Navbar