import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import LoginForm from '../components/forms/Logiform';
import { useLoginMutation } from '../utils/feature/auth/authApi';
import { LoginRequest } from '../utils/feature/auth/type';




function LoginPage() {
    const {i18n} = useTranslation()
    const [login,] = useLoginMutation()
    const navigate = useNavigate()
    const handleLogin = async (data: LoginRequest) => {

        try {
            const response = await login({user:data, lang:i18n.language}).unwrap()
            navigate("/verify-otp",{state:{response,email:data.email}})
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
            toast.error( i18n.language === "fr"? error.data.message: error.data.messageE)
            console.log(error.data.message)
        }   

        // console.log('Credentials:', data)
        // dispatch(logIn(data))
        // navigate("/")

    }
    return (
        <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center">
    
            <LoginForm  onSubmit={handleLogin} />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                pauseOnHover
                draggable
                theme="colored"
            />
        </div>
    )
}

export default LoginPage