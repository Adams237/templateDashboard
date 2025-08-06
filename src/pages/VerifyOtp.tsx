import React from 'react'
import { useLocation } from 'react-router-dom'
import VerifyForm from '../components/forms/VerifyForm'

function VerifyOtp() {
    const {state} = useLocation()
    const data = state 
      
  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center">
        <VerifyForm email = {data.email}/>
    </div>
  )
}

export default VerifyOtp