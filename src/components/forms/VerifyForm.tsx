// src/pages/VerificationPage.tsx
import React, { useRef, useState, useEffect, KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logIn } from '../../utils/redux/slice/user.slice'
import { useVerifyOtpMutation } from '../../utils/feature/auth/authApi'
import { Loader2 } from 'lucide-react'

interface VerifyFormProps {

  email: string
}

export const VerifyForm = ({ email }: VerifyFormProps) => {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [verifyOtp, { isLoading: isSubmitting }] = useVerifyOtpMutation()
  // État : tableau de 4 strings (chiffres)
  const [code, setCode] = useState<string[]>(['', '', '', '', '', ''])
  // Réfs pour chaque input pour gérer le focus
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])

  // À l’affichage, on met le focus sur le premier champ
  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  // Quand on change un champ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const val = e.target.value
    if (!/^\d?$/.test(val)) return         // n’accepte qu’un seul chiffre
    const newCode = [...code]
    newCode[idx] = val
    setCode(newCode)
    if (val && idx < inputRefs.current.length - 1) {
      // si chiffre saisi, on focus l’input suivant
      inputRefs.current[idx + 1]?.focus()
    }
  }

  // Gestion du Backspace pour revenir en arrière
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace' && !code[idx] && idx > 0) {
      const prev = inputRefs.current[idx - 1]
      prev?.focus()
      const newCode = [...code]
      newCode[idx - 1] = ''
      setCode(newCode)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const otp = code.join('')
    if (otp.length < 6) {
      alert('Veuillez saisir les 6 chiffres.')
      return
    }
    try {
      const response = await verifyOtp({ email, otp, lang: i18n.language }).unwrap()
      dispatch(logIn({
        user: response.user_id,
        token: response.access_token
      }))
      navigate("/")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error)
      toast.error(i18n.language === "fr" ? error.data.message : error.data.messageE)
    }
    // Appel API ou logique de vérification
    console.log('Code entré :', otp)
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm text-center space-y-6"
      >
        <h1 className="text-2xl font-semibold">{t("auth.verify")}</h1>
        <p className="text-gray-600">{t("auth.enter_otp_code")}</p>

        <div className="flex justify-between space-x-2">
          {code.map((digit, idx) => (
            <input
              key={idx}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(e, idx)}
              onKeyDown={e => handleKeyDown(e, idx)}
              ref={el => (inputRefs.current[idx] = el)}
              className="w-12 h-12 text-xl text-center border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
        >
          {isSubmitting ? <Loader2 className='animate-spin w-4 h-4'/> : t("auth.verify_buttom")}
        </button>
      </form>
    </div>
  )
}

export default VerifyForm
