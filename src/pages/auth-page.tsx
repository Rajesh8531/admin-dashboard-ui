import AuthUI from '../components/auth-ui'
import Layout from '../components/layout'
import getUser from '../actions/getUser'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Auth = () => {

  const navigate = useNavigate()

  const user = getUser()

  useEffect(()=>{

    if(user){
      navigate('/create')
    }
    
  },[])

  

  return (
    <Layout title='Authentication' >
        <AuthUI />
    </Layout>
  )
}

export default Auth