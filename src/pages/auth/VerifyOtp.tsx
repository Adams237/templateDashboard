import React from 'react'
import VerifyForm from '../../components/forms/auth/VerifyForm'
import { useLocation } from 'react-router-dom'

function VerifyOtp() {
  const { state } = useLocation()
  const data = state 
  return (
    <div className="min-h-screen dark:bg-slate-600 w-full bg-cover bg-center bg-[url('/bg4B.png')] bg-gray-100 flex flex-col items-center justify-center">

      <VerifyForm phone_number={data} />
    </div>
  )
}

export default VerifyOtp