// src/features/auth/LoginForm.tsx
import React  from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { UserInterface } from '../../utils/interfaces/user.interface'
import imageCompression from 'browser-image-compression';
import { fileToBase64 } from '../../utils/feature/utils';

// 1. Définition des données du formulaire


interface DataProps {
    onSubmit: (data: UserInterface) => Promise<void> | void,
    setStep: (step: number) => void
}

// Regex pour numéro camerounais
const phoneRegex = /^(?:\+237|0)6[0-9]{8}$/
const NewMicrofinanceForm: React.FC<DataProps> = ({ onSubmit, setStep }) => {
    const { t } = useTranslation()
    const {
        control,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<UserInterface>()

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className=" mx-auto w-[90%] p-6 bg-white rounded-2xl shadow-md space-y-6"
        >
            <div className="flex justify-center items-center">
                <div onClick={() => setStep(1)} className=' cursor-pointer bg-green-600 font-bold text-[18px] text-white w-8 h-8 rounded-full flex items-center justify-center ' >1</div>
                <div className=' h-1 w-[40%] bg-gray-400 ' ></div>
                <div className=' cursor-not-allowed bg-gray-600 font-bold text-[18px] text-white w-8 h-8 rounded-full flex items-center justify-center ' >2</div>
                <div className=' h-1 w-[40%] bg-gray-400 ' ></div>
                <div className=' cursor-not-allowed bg-gray-600 font-bold text-[18px] text-white w-8 h-8 rounded-full flex items-center justify-center ' >{t("microfinace.end")}</div>
            </div>

            <h2 className="text-2xl font-bold text-center">
                {t("microfinace.new")}
            </h2>

            <div className='grid md:grid-cols-2 grid-cols-1 space-x-2'>
                {/* Name */}
                <div className='ml-2'>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                        {t("microfinace.name")}
                    </label>
                    <input
                        id="name"
                        type="text"
                        {...register('name', {
                            required: t("microfinace.name_required"),
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
                        {t("microfinace.email")}
                    </label>
                    <input
                        id="email"
                        type="email"
                        {...register('email', {
                            required: t("microfinace.email_required"),

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


                {/* Phone */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                        {t("microfinace.phone_number")}
                    </label>
                    <input
                        id="phone"
                        type="text"
                        {...register('phone_number', {
                            required: t("microfinace.phone_required"),
                            pattern: {
                                value: phoneRegex,
                                message: t("microfinace.phone_invalid")
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


                {/* City */}
                <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-1">
                        {t("microfinace.city")}
                    </label>
                    <input
                        id="city"
                        type="text"
                        {...register('city', {
                            required: t("microfinace.city_required"),

                        })}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.city
                            ? 'border-red-500 focus:ring-red-300'
                            : 'border-gray-300 focus:ring-blue-300'
                            }`}
                    />
                    {errors.city && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.city.message}
                        </p>
                    )}
                </div>


                {/* Address */}
                <div>
                    <label htmlFor="address" className="block text-sm font-medium mb-1">
                        {t("microfinace.address")}
                    </label>
                    <input
                        id="address"
                        type="text"
                        {...register('address', {
                            required: t("microfinace.address_required"),

                        })}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.address
                            ? 'border-red-500 focus:ring-red-300'
                            : 'border-gray-300 focus:ring-blue-300'
                            }`}
                    />
                    {errors.address && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.address.message}
                        </p>
                    )}
                </div>


                {/* Picture */}
                <div>
                    <label htmlFor="Picture" className="block text-sm font-medium mb-1">
                        {t("microfinace.picture")}
                    </label>
                    <Controller
                        name="profile_picture"
                        control={control}
                        rules={{ required: t('microfinace.picture_required') }}
                        render={({ field }) => (
                            <input
                                type="file"
                                accept="image/*"
                                onChange={async e => {
                                    const file = e.target.files?.[0]
                                    if (!file) return
                                    // Compression
                                    const options = { maxSizeMB: 0.2, maxWidthOrHeight: 1024, useWebWorker: true }
                                    const resized = await imageCompression(file, options)
                                    // Conversion en base64
                                    const dataUrl = await fileToBase64(resized)
                                    // MàJ du formulaire
                                    field.onChange(dataUrl)
                                }}
                                className={` w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2  ${errors.profile_picture
                                        ? 'border-red-500 focus:ring-red-300'
                                        : 'border-gray-300 focus:ring-blue-300'}
                                `}
                            />
                        )}
                    />
                    {errors.profile_picture && (
                        <p className="mt-1 text-sm text-red-600">{errors.profile_picture.message}</p>
                    )}
                </div>
            </div>



            {/* Bouton de Soumission */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
                {isSubmitting ? t("...") : t("microfinace.next")}
            </button>
        </form>
    )
}

export default NewMicrofinanceForm
