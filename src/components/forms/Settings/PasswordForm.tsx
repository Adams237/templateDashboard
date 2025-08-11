import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { ToastContainer } from 'react-toastify'


export interface PassworDProps {
    old_password: string,
    new_password: string,
    confirm_password: string
}

interface DataProps {
    onSubmit: (data: PassworDProps) => Promise<void> | void,
}

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

const PasswordForm: React.FC<DataProps> = ({ onSubmit }: DataProps) => {
    const { t } = useTranslation()
    const {
        // control,
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<PassworDProps>()
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className=" mx-auto w-[90%] p-6   space-y-6"
        >

            <h2 className="text-2xl font-bold text-center">
                {t("settings.update_password")}
            </h2>

            <div className='grid  grid-cols-1 space-x-2'>
                {/* old password */}
                <div className=' grid md:grid-cols-[20%,80%] grid-cols-1 justify-center items-center mb-10'>
                    <label htmlFor="name" className="block text-sm font-medium md:mb-8 mb-1">
                        {t("settings.old_password")} :
                    </label>
                    <div>
                        <input
                            id="old_password"
                            type="password"
                            {...register('old_password', {
                                required: t("settings.old_password_required"),

                            })}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.old_password
                                ? 'border-red-500 focus:ring-red-300'
                                : 'border-gray-300 focus:ring-blue-300'
                                }`}
                        />
                        {errors.old_password && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.old_password.message}
                            </p>
                        )}
                    </div>

                </div>
                {/* new password */}
                <div className=' grid md:grid-cols-[20%,80%] grid-cols-1 mb-10 justify-center items-center'>
                    <label htmlFor="name" className="block text-sm font-medium md:mb-10 mb-1">
                        {t("settings.new_password")}:
                    </label>
                    <div>
                        <input
                            id="new_password"
                            type="password"
                            {...register('new_password', {
                                required: t("settings.new_password_required"),
                                pattern: {
                                    value: passwordRegex,
                                    message: t("microfinace.password_invalid")
                                }
                            })}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.new_password
                                ? 'border-red-500 focus:ring-red-300'
                                : 'border-gray-300 focus:ring-blue-300'
                                }`}
                        />
                        {errors.new_password && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.new_password.message}
                            </p>
                        )}
                    </div>

                </div>

                {/* Confirm Password */}
                <div className=' grid md:grid-cols-[20%,80%] grid-cols-1  justify-center items-center' >
                    <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                        {t("microfinace.confirm_password")}
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        {...register('confirm_password', {
                            required: t("microfinace.confirm_password_required"),
                            validate: (value) => {
                                if (value !== watch('new_password')) {
                                    return t("microfinace.password_match");
                                }
                                return true;
                            }
                        })}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.confirm_password
                            ? 'border-red-500 focus:ring-red-300'
                            : 'border-gray-300 focus:ring-blue-300'
                            }`}
                    />
                    {errors.confirm_password && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.confirm_password.message}
                        </p>
                    )}
                </div>
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
                {isSubmitting ? t("...") : t("settings.updated_password")}
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

export default PasswordForm
