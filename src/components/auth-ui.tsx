import { useState } from 'react'
import * as z from 'zod'
import { IoIosPlay } from "react-icons/io";
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin} from '@react-oauth/google'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import API from '../helpers/connection.ts'
import CustomTransition from './custom-transition'
import Header from './auth-header.tsx'
import AuthButton from './ui/authbutton.tsx'
import SeparatorOr from './or-separator';
import Input from './input/input';
import setItem from '../actions/setItem.tsx'


const userSchema = z.object({
  name : z.string(),
  email : z.string().email().min(5),
  password : z.string().min(4)
})

type schemaType = z.infer<typeof userSchema>

const AuthUI = () => {

    const [signIn,setSignIn] = useState(false)

    const navigate = useNavigate()

    const toggleSignin = ()=>{
      setSignIn(!signIn)
    }

    const [isLoading,setIsLoading] = useState(false)

    const title = signIn ? 'Sign in to dashboard' : 'Create your account'
    const description = signIn ? 'Welcome back! Please sign in to continue' : 'Welcome! Please fill in the details to get started.'
    const text = signIn ? "Don't have an account?" : 'Already have an account?'

    const form = useForm<schemaType>({
      resolver : zodResolver(userSchema),
      defaultValues : {
        email : '',
        password : '',
        name : ''
      }
    })

    const googleLogin = useGoogleLogin({
      onSuccess: async (tokenResponse) => {
        const { access_token } =  tokenResponse
        const {data} = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo`,{headers : {Authorization : `Bearer ${access_token}`}})
        const userObject = {
          token : access_token,
          name : data?.name,
          id : data?.sub,
          email : data?.email
        }
        setItem('profile',userObject)
        toast.success("Signed in Successfully")
        navigate('/create')
      }
    });

    const {errors} = form.formState

    const onSubmit = async (values:schemaType)=>{
      try {
        setIsLoading(true)
        let res;
        let message;

          if(signIn){
            res = await API.post('auth/signin',values)
            message = "Signed In"
          } else {
            res = await API.post('auth/signup',values)
            message = "Registered Successfully"
          }  
          setItem('profile',res.data)
        toast.success(message)
        navigate('/create')
      } catch (error) {
        toast.error("Something went wrong") 
      } finally {
        setIsLoading(false)
      }
    }

  return (
    <CustomTransition show className=''>
        <div className='w-[420px] h-auto bg-white rounded-lg p-5 border shadow-2xl' >
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-y-6 items-center'>
                <Header title={title} description={description} />

                    <AuthButton disabled={isLoading} className='flex items-center w-full justify-center' type='button' onClick={()=>googleLogin()}   >
                      <FcGoogle className='w-5 h-5 mr-4' />
                      <p className='text-sm'>Continue with Google</p>
                    </AuthButton>
                    
                <SeparatorOr break />
                {!signIn && (
                  <Input errors={errors} id='user_name' {...form.register('name')} placeholder='Enter your name here' label='Username' disabled={false} />)}
                <Input disabled={isLoading} errors={errors} id='email' {...form.register('email',{required:true})} type='email' placeholder='Enter your email address here' label='Email address'  />
                <Input disabled={isLoading} errors={errors} id='password' {...form.register('password',{required:true})} type='password' placeholder='Enter your password here' label='Password'  />
                <AuthButton disabled={isLoading} type='submit' className='flex items-center justify-center' variant='secondary' onClick={()=>{}} >Continue<IoIosPlay className='h-3 w-3 ml-2 ' /> </AuthButton>
                <SeparatorOr />
                <div className='text-sm flex items-center justify-center'>
                  <p className='text-neutral-500 mr-2'>{text}</p>
                  <p onClick={toggleSignin} className='hover:underline cursor-pointer '>{signIn ? 'Sign up' : 'Sign in'}</p>
                </div>
            </form>
        </div>
    </CustomTransition>
  )
}

export default AuthUI