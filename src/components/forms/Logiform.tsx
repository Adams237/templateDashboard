// src/features/auth/LoginForm.tsx
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import logo from "../../assets/images/logo_collect_black.png"

// 1. Définition des données du formulaire
interface LoginFormData {
  phone_number: string
  password: string
}

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void> | void
}

// Regex pour numéro camerounais
const phoneRegex = /^(?:\+237|0)6[0-9]{8}$/

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
        <img src={logo} alt="Logo Collect" />
      </div>

      <h2 className="text-2xl font-bold text-center">
        {t("auth.login")}
      </h2>

      {/* Téléphone */}
      <div>
        <label htmlFor="phone_number" className="block text-sm font-medium mb-1">
          {t("auth.phone_number")}
        </label>
        <input
          id="phone_number"
          type="text"
          {...register('phone_number', {
            required: "Le numéro de téléphone est requis",
            pattern: {
              value: phoneRegex,
              message: "Numéro camerounais invalide (doit commencer par +2376xxxxxxx ou 06xxxxxxx)"
            }
          })}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.phone_number
            ? 'border-red-500 focus:ring-red-300'
            : 'border-gray-300 focus:ring-blue-300'
          }`}
        />
        {errors.phone_number && (
          <p className="mt-1 text-sm text-red-600">
            {errors.phone_number.message}
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
          {...register('password', {
            required: "Le mot de passe est requis",
            minLength: { value: 4, message: "Au moins 4 caractères" }
          })}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.password
            ? 'border-red-500 focus:ring-red-300'
            : 'border-gray-300 focus:ring-blue-300'
          }`}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Bouton de Soumission */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? t("auth.logging_in") : t("auth.login")}
      </button>
    </form>
  )
}

export default LoginForm
