// src/features/auth/LoginForm.tsx
import React  from 'react'
import { useForm} from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { LicenceRequest } from '../../utils/feature/licence/type';

// 1. Définition des données du formulaire


interface DataProps {
    onSubmit: (data: LicenceRequest) => Promise<void> | void,
}

// Regex pour numéro camerounais
const NewLicenceForm: React.FC<DataProps> = ({ onSubmit }) => {
    const { t } = useTranslation()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LicenceRequest>()

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className=" mx-auto h-[70vh] overflow-y-auto w-[90%] p-6 bg-white rounded-2xl shadow-md space-y-6"
        >
           

            <h2 className="text-2xl font-bold text-center">
                {t("package.new")}
            </h2>

            <div className='grid  grid-cols-1 space-x-2'>
                {/* Name */}
                <div className='ml-2'>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                        {t("package.intitule")}
                    </label>
                    <input
                        id="name"
                        type="text"
                        {...register('name', {
                            required: t("package.name_required"),
                        })}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.name
                            ? 'border-red-500 focus:ring-red-300'
                            : 'border-gray-300 focus:ring-blue-300'
                            }`}
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                        {t("package.user_number")}
                    </label>
                    <input
                        id="user_number"
                        type="number"
                        {...register('max_users', {
                            required: t("microfinace.user_number_required"),

                        })}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.max_users
                            ? 'border-red-500 focus:ring-red-300'
                            : 'border-gray-300 focus:ring-blue-300'
                            }`}
                    />
                    {errors.max_users && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.max_users.message}
                        </p>
                    )}
                </div>


                {/* Phone */}
                <div>
                    <label htmlFor="Transaction" className="block text-sm font-medium mb-1">
                        {t("package.transaction_number")}
                    </label>
                    <input
                        id="transaction"
                        type="number"
                        {...register('max_transactions', {
                            required: t("package.transaction_required")
                        })}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.max_transactions
                            ? 'border-red-500 focus:ring-red-300'
                            : 'border-gray-300 focus:ring-blue-300'
                            }`}
                    />
                    {errors.max_transactions && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.max_transactions.message}
                        </p>
                    )}
                </div>


                {/* City */}
                <div>
                    <label htmlFor="Price" className="block text-sm font-medium mb-1">
                        {t("package.price")}
                    </label>
                    <input
                        id="price"
                        type="number"
                        {...register('monthly_price', {
                            required: t("package.price_required"),

                        })}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.monthly_price
                            ? 'border-red-500 focus:ring-red-300'
                            : 'border-gray-300 focus:ring-blue-300'
                            }`}
                    />
                    {errors.monthly_price && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.monthly_price.message}
                        </p>
                    )}
                </div>


               


              
            </div>



            {/* Bouton de Soumission */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
                {isSubmitting ? t("...") : t("microfinace.submit")}
            </button>
        </form>
    )
}

export default NewLicenceForm
