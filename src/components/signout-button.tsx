import { LogOutIcon} from "lucide-react"
import getUser from "../actions/getUser"
import SeparatorOr from "./separator"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import signOut from "../actions/signOut"
import Avatar from "./avatar"
import { useNavigate } from "react-router-dom"

const SignoutButton = () => {

  const user = getUser()
  const navigate = useNavigate()

  const logOutUser = ()=>{
    signOut()
    navigate('/auth')
  }

  return (
    <Popover>
        <PopoverTrigger asChild>
            <div>
                <Avatar />
            </div>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0 rounded-lg mr-1">
            <div className=" flex flex-col mr-2 w-full">
              <div className=" flex items-center p-3 gap-3">
              <Avatar />
                  <div className="flex rounded-b-lg flex-col gap-y-0.5 text-[13px] leading-none justify-center">
                        <p >{user.name}</p>
                        <p >{user.email}</p>
                  </div>
              </div>
              <SeparatorOr />
              <div onClick={logOutUser} className="hover:bg-neutral-100 transition px-6 py-3 flex items-center gap-6 text-[14px] cursor-pointer">
                  <LogOutIcon className="h-4 w-4 text-gray-500" />
                  <p>Sign out</p>
              </div>
            </div>
        </PopoverContent>
    </Popover>
  )
}

export default SignoutButton