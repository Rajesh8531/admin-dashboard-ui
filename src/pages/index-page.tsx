import { useLoaderData, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import getUser from '../actions/getUser'
import { Store } from '../types'

import Layout from '../components/layout'

const IndexPage = () => {

  const navigate = useNavigate()
  const user = getUser()
  const data = useLoaderData() as Store[] | null 

  console.log()
  
  useEffect(()=>{

    if(!user){
      navigate('/auth')
    } else if(data && data.length == 0){
      navigate(`/create`)
    }
    
  },[])

  return (
    <Layout title='Landing Page'>
      <p></p>
    </Layout>
  )
}

export default IndexPage