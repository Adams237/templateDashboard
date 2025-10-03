// src/features/auth/LoginForm.tsx
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import logo from "/icon_transparent.png"
import { Loader2 } from 'lucide-react'

// 1. Définition des données du formulaire
interface LoginFormData {
  email: string
  password_hash: string
}

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void> | void
}

// Regex pour numéro camerounais
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>()

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto w-[80%] p-6 bg-white rounded-2xl shadow-md space-y-6"
    >
      <div className="flex justify-center items-center">
        <img className='w-20 h-20' src={logo} alt="Logo Collect" />
      </div>

      <h2 className="text-2xl font-bold text-center">
        {t("auth.login")}
      </h2>

      {/* Téléphone */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          {t("auth.email")}
        </label>
        <input
          id="email"
          type="text"
          {...register('email', {
            required: "L'email est requis",
            pattern: {
              value: emailRegex,
              message: "Email invalide"
            }
          })}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.email
            ? 'border-red-500 focus:ring-red-300'
            : 'border-gray-300 focus:ring-blue-300'
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Mot de passe */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          {t("auth.password")}
        </label>
        <input
          id="password"
          type="password"
          {...register('password_hash', {
            required: "Le mot de passe est requis",
            minLength: { value: 4, message: "Au moins 4 caractères" }
          })}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.password_hash
            ? 'border-red-500 focus:ring-red-300'
            : 'border-gray-300 focus:ring-blue-300'
          }`}
        />
        {errors.password_hash && (
          <p className="mt-1 text-sm text-red-600">
            {errors.password_hash.message}
          </p>
        )}
      </div>

      {/* Bouton de Soumission */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 bg-blue-600 flex items-center justify-center gap-2 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? <Loader2 className='animate-spin w-4 h-4'/> : t("auth.login")}
      </button>
    </form>
  )
}

export default LoginForm
