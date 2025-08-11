// src/features/auth/LoginForm.tsx
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
// import { UserInterface } from '../../utils/interfaces/user.interface'
import imageCompression from 'browser-image-compression';
import { MicrofinanceResponse } from '../../../utils/feature/microfinance/type';
import { fileToBase64 } from '../../../utils/feature/utils';
import { ToastContainer } from 'react-toastify';
import { Loader2 } from 'lucide-react';

// 1. Définition des données du formulaire


interface DataProps {
    onSubmit: (data: MicrofinanceResponse) => Promise<void> | void,
    defaultValue: MicrofinanceResponse
}

// Regex pour numéro camerounais
const phoneRegex = /^(?:\+237|0)6[0-9]{8}$/
const UpdateInfo: React.FC<DataProps> = ({ onSubmit, defaultValue }) => {
    const { t } = useTranslation()
    const {
        control,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<MicrofinanceResponse>({ defaultValues: defaultValue })

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className=" mx-auto w-[90%] p-6 bg-white rounded-2xl shadow-md space-y-6"
        >


            <h2 className="text-2xl font-bold text-center">
                {t("settings.update")}
            </h2>

            <div className='grid md:grid-cols-2 grid-cols-1 space-x-2'>
                {/* Name */}
                <div className='ml-2'>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                        {t("settings.name")}
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
                        {t("settings.email")}
                    </label>
                    <input
                        id="email"
                        readOnly
                        type="email"
                        {...register('email', {
                            required: t("microfinace.email_required"),

                        })}
                        className={`w-full px-4 py-2 border rounded-lg bg-gray-300 focus:outline-none focus:ring-2 ${errors.email
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
                        {t("settings.phone")}
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



                {/* Country */}
                <div>
                    <label htmlFor="country" className="block text-sm font-medium mb-1">
                        {t("microfinace.country")}
                    </label>
                    <input
                        id="country"
                        type="text"
                        {...register('country', {
                            required: t("microfinace.country_required"),
                        })}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.country
                            ? 'border-red-500 focus:ring-red-300'
                            : 'border-gray-300 focus:ring-blue-300'
                            }`}
                    />
                    {errors.country && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.country.message}
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
                className="w-full py-2 bg-blue-600 text-white flex justify-center items-center rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
                {isSubmitting ? <Loader2 className=' animate-spin ' /> : t("settings.update_inf")}
            </button>
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
        </form>
    )
}

export default UpdateInfo
