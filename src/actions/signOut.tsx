import { useNavigate } from "react-router-dom"


const signOut = () => {
  const navigate = useNavigate()
  localStorage.removeItem('profile')
  navigate('/')
}

export default signOut