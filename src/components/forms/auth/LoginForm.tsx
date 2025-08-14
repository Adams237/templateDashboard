// src/features/auth/LoginForm.tsx
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { zodResolver } from '@hookform/resolvers/zod'
import logo from "/vite.svg"
import { Loader2, Moon, Sun } from 'lucide-react'
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { hCaptchaKeySite } from '../../../constant/key'
import { useDarkMode } from '../../../Hooks/hooks'

// 1. Définition du schéma Zod
const loginSchema = z.object({
  phone_number: z.string()
    .regex(/^(?:\+237|0)6[0-9]{8}$/, {
      message: "Numéro camerounais invalide (doit commencer par +2376xxxxxxx ou 06xxxxxxx)"
    }),
  password: z.string().min(4, { message: "Au moins 4 caractères" }),
})
type LoginFormData = z.infer<typeof loginSchema>

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void> | void
  handleVerification: (token: string) => void
}



const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, handleVerification }) => {
  const { t, i18n } = useTranslation()
  const { isDark, setIsDark } = useDarkMode();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })
  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto w-[80%] p-6 mt-5 mb-5 bg-white dark:bg-slate-950 dark:text-slate-100 rounded-2xl shadow-md space-y-6"
    >
      <div className=' flex items-end justify-end'>
        <button
          onClick={() => setIsDark(!isDark)}
          className="inline-flex  justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        <select  value={i18n.language} onChange={(e) => handleChangeLanguage(e.target.value)} name="" id="">
          <option className='dark:text-black'  value="fr">Français</option>
          <option  className='dark:text-black'   value="en">English</option>
        </select>
      </div>

      <div className=' flex justify-center items-center'>
        <img className='w-20 h-20' src={logo} alt="" />
      </div>

      <h2 className="text-2xl font-bold text-center">{t("login.title")}</h2>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          {t("login.phone_number")}
        </label>
        <input
          id="email"
          type="text"
          {...register('phone_number')}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.phone_number
            ? 'border-red-500 focus:ring-red-300'
            : 'border-gray-300 focus:ring-blue-300'
            }`}
        />
        {errors.phone_number && (
          <p className="mt-1 text-sm text-red-600">{errors.phone_number.message}</p>
        )}
      </div>

      {/* Mot de passe */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          {t("login.password")}
        </label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.password
            ? 'border-red-500 focus:ring-red-300'
            : 'border-gray-300 focus:ring-blue-300'
            }`}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>
      <div className='w-full flex justify-center items-center mb-4'>

        <HCaptcha sitekey={hCaptchaKeySite} onVerify={handleVerification} />
      </div>
      {/* Bouton de Soumission */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 bg-blue-600 text-white flex items-center justify-center rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? <Loader2 className='text-white' /> : t("login.submit")}
      </button>
    </form>
  )
}

export default LoginForm
