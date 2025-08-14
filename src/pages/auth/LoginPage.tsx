import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
// import { hCaptchaKeySite } from '../constants/keys';
import axios from 'axios';
import LoginForm from '../../components/forms/auth/LoginForm';






function LoginPage() {
  const { i18n, t } = useTranslation()
  const navigate = useNavigate()
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

 


  const handleVerification = (token: string) => {
    setCaptchaToken(token);
  };



  const handleLogin = async (data: { phone_number: string; password: string }) => {

    if (!captchaToken) {
      toast.error(t("login.verify_captcha"))
      return;
    }

    try {
      const response = await axios.post('https://ecollect.api.alshadows.com/auth/hcaptcha/verify', {
        token: captchaToken,
      });
      if (response.data.success) {

        navigate("/verify-otp", { state: data.phone_number })
      } else {
        toast.error(t("alologinginuth.captcha_error"))
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error)
      if (error.data.message) {
        toast.error(i18n.language === "fr" ? error.data.message : error.data.messageE)
      }
      else {
        toast.error(t("auth.error_login"))
      }

      console.log(error)
    }

  }

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-slate-600 flex flex-col items-center justify-center">
      
      <LoginForm handleVerification={handleVerification} onSubmit={handleLogin} />
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