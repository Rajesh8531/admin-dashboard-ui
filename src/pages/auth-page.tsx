import AuthUI from '../components/auth-ui'
import Layout from '../components/layout'
import { GoogleOAuthProvider } from '@react-oauth/google';

const Auth = () => {

  
  return (
    <Layout title='Authentication' >
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <AuthUI />
      </GoogleOAuthProvider>
    </Layout>
  )
}

export default Auth