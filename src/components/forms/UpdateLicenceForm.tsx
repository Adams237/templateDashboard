// src/features/auth/LoginForm.tsx
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { LicenceResponse } from '../../utils/feature/licence/type';
import { Plus, Trash } from 'lucide-react';
import { ToastContainer } from 'react-toastify';

// 1. Définition des données du formulaire


interface DataProps {
    onSubmit: (data: LicenceResponse) => Promise<void> | void,
    licence: LicenceResponse
}

// Regex pour numéro camerounais
const UpdateLicenceForm: React.FC<DataProps> = ({ onSubmit, licence }) => {
    const { t } = useTranslation()
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<LicenceResponse>({ defaultValues: licence })
    // console.log(licence)
    const features = watch('features')
    const features_en = watch('features_en')
    const limitations = watch('limitations')
    const limitations_en = watch('limitations_en')
    const discount_rules = watch("discount_rules") ?? []

    const handleDeleteFeature = (index: number, type: string) => {
        if (type === 'features') {
            const updatedFeatures = [...features];
            updatedFeatures.splice(index, 1);
            setValue('features', updatedFeatures);
        } else {
            const updatedFeatures = [...features_en];
            updatedFeatures.splice(index, 1);
            setValue('features_en', updatedFeatures);
        }
    };


    const handleAddFeature = (type: string) => {
        if (type === 'features') {
            const updatedFeatures = [...features, ''];
            setValue('features', updatedFeatures);
        } else {
            const updatedFeatures = [...features_en, ''];
            setValue('features_en', updatedFeatures);
        }
    };

    const handleAddLimitation = (type: string) => {
        if (type === 'limitations') {
            const updatedLimitations = [...limitations, ''];
            setValue('limitations', updatedLimitations);
        } else {
            const updatedLimitations = [...limitations_en, ''];
            setValue('limitations_en', updatedLimitations);
        }
    };
    const handleDeleteLimitation = (index: number, type: string) => {
        if (type === 'limitations') {
            const updatedLimitations = [...limitations];
            updatedLimitations.splice(index, 1);
            setValue('limitations', updatedLimitations);
        } else {
            const updatedLimitations = [...limitations_en];
            updatedLimitations.splice(index, 1);
            setValue('limitations_en', updatedLimitations);
        }
    };

    const handleAddReduction = () => {
        const updateAddReduction = [...discount_rules, { from_months: 0, percent: 0 }]
        setValue("discount_rules", updateAddReduction)
    }
    const handleDeleteReduction = (index: number) => {
        const updatedReduction = [...discount_rules]
        updatedReduction.splice(index, 1)
        setValue("discount_rules", updatedReduction)
    }





    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className=" mx-auto h-[70vh] overflow-y-auto w-[90%] p-6 bg-white rounded-2xl shadow-md space-y-6"
        >
            <h2 className="text-2xl font-bold text-center">
                {t("package.update")}
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


                {/* price */}
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

                {/* nombre de mois */}
                <div>
                    <label htmlFor="Mois" className="block text-sm font-medium mb-1">
                        {t("package.number_of_months")}
                    </label>
                    <input
                        id="price"
                        type="number"
                        {...register('number_of_months', {
                            required: t("package.number_of_months_required"),

                        })}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.number_of_months
                            ? 'border-red-500 focus:ring-red-300'
                            : 'border-gray-300 focus:ring-blue-300'
                            }`}
                    />
                    {errors.number_of_months && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.number_of_months.message}
                        </p>
                    )}
                </div>

                {/* description */}
                <div>
                    <label htmlFor="Mois" className="block text-sm font-medium mb-1">
                        {t("package.description")}
                    </label>
                    <textarea
                        id="description"
                        {...register('description', {
                            required: t("package.description_required"),

                        })}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.description
                            ? 'border-red-500 focus:ring-red-300'
                            : 'border-gray-300 focus:ring-blue-300'
                            }`}
                    />
                    {errors.description && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.description.message}
                        </p>
                    )}
                </div>

                {/* description_en */}
                <div>
                    <label htmlFor="description_en" className="block text-sm font-medium mb-1">
                        {t("package.description_en")}
                    </label>
                    <textarea
                        id="description_en"
                        {...register('description_en', {
                            required: t("package.description_en_required"),

                        })}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.description_en
                            ? 'border-red-500 focus:ring-red-300'
                            : 'border-gray-300 focus:ring-blue-300'
                            }`}
                    />
                    {errors.description_en && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.description_en.message}
                        </p>
                    )}
                </div>

                {/* color */}
                <div>
                    <label htmlFor="color" className="block text-sm font-medium mb-1">
                        {t("package.color")}
                    </label>
                    <input
                        id="color"
                        {...register('color', {
                            required: t("package.color_required"),

                        })}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.color
                            ? 'border-red-500 focus:ring-red-300'
                            : 'border-gray-300 focus:ring-blue-300'
                            }`}
                    />
                    {errors.color && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.color.message}
                        </p>
                    )}
                </div>

                {/* popular */}
                <div className='flex flex-col gap-2 m-2'>
                    <label htmlFor="popular" className="block text-sm font-medium mb-1">
                        {t("package.popular")}
                    </label>
                    <select id='popular' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2' {...register('popular')}>
                        <option value="true">{t("package.popular_true")}</option>
                        <option value="false">{t("package.popular_false")}</option>
                    </select>

                    {errors.popular && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.popular.message}
                        </p>
                    )}
                </div>

                {/* features */}
                <div>
                    <label htmlFor="features" className="block text-sm font-medium mb-1">
                        {t("package.features")}
                    </label>
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <input
                                type="text"
                                id={`feature-${index}`}
                                {...register(`features.${index}`, {
                                    required: t("package.features_required"),
                                })}
                                className={`w-full px-4 py-2 border mb-2 rounded-lg focus:outline-none focus:ring-2 ${errors.features ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
                                    }`}
                            />
                            <button
                                type="button"
                                onClick={() => handleDeleteFeature(index, 'features')}
                                className="text-red-500 hover:text-red-700"
                            >
                                <Trash className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                    <div className='flex items-center justify-end gap-2'>
                        <button
                            type="button"
                            onClick={() => handleAddFeature('features')}
                            className="text-blue-500 bg-blue-100 px-2 py-1 rounded-lg flex items-center gap-2 hover:text-blue-700"
                        >
                            {t("package.add_feature")}
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                </div>
                {/* features_en */}
                <div>
                    <label htmlFor="features_en" className="block text-sm font-medium mb-1">
                        {t("package.features_en")}
                    </label>
                    {features_en.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <input
                                type="text"
                                id={`feature-en-${index}`}
                                {...register(`features_en.${index}`, {
                                    required: t("package.features_en_required"),
                                })}
                                className={`w-full px-4 py-2 border mb-2 rounded-lg focus:outline-none focus:ring-2 ${errors.features ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
                                    }`}
                            />
                            <button
                                type="button"
                                onClick={() => handleDeleteFeature(index, 'features_en')}
                                className="text-red-500 hover:text-red-700"
                            >
                                <Trash className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                    <div className='flex items-center justify-end gap-2'>
                        <button
                            type="button"
                            onClick={() => handleAddFeature('features_en')}
                            className="text-blue-500 bg-blue-100 px-2 py-1 rounded-lg flex items-center gap-2 hover:text-blue-700"
                        >
                            {t("package.add_feature_en")}
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                </div>
                {/* limitations */}
                <div>
                    <label htmlFor="limitations" className="block text-sm font-medium mb-1">
                        {t("package.limitations")}
                    </label>
                    {limitations.map((limitation, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <input
                                type="text"
                                id={`limitation-${index}`}
                                {...register(`limitations.${index}`, {
                                    required: t("package.limitations_required"),
                                })}
                                className={`w-full px-4 py-2 border mb-2 rounded-lg focus:outline-none focus:ring-2 ${errors.features ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
                                    }`}
                            />
                            <button
                                type="button"
                                onClick={() => handleDeleteLimitation(index, 'limitations')}
                                className="text-red-500 hover:text-red-700"
                            >
                                <Trash className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                    <div className='flex items-center justify-end gap-2'>
                        <button
                            type="button"
                            onClick={() => handleAddLimitation('limitations')}
                            className="text-blue-500 bg-blue-100 px-2 py-1 rounded-lg flex items-center gap-2 hover:text-blue-700"
                        >
                            {t("package.add_limitations")}
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                </div>

                {/* limitations_en */}
                <div>
                    <label htmlFor="limitations_en" className="block text-sm font-medium mb-1">
                        {t("package.limitations_en")}
                    </label>
                    {limitations_en.map((limitation_en, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <input
                                type="text"
                                id={`limitation_en-${index}`}
                                {...register(`limitations_en.${index}`, {
                                    required: t("package.limitations_en_required"),
                                })}
                                className={`w-full px-4 py-2 border mb-2 rounded-lg focus:outline-none focus:ring-2 ${errors.features ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
                                    }`}
                            />
                            <button
                                type="button"
                                onClick={() => handleDeleteLimitation(index, 'limitations_en')}
                                className="text-red-500 hover:text-red-700"
                            >
                                <Trash className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                    <div className='flex items-center justify-end gap-2'>
                        <button
                            type="button"
                            onClick={() => handleAddLimitation('limitations_en')}
                            className="text-blue-500 bg-blue-100 px-2 py-1 rounded-lg flex items-center gap-2 hover:text-blue-700"
                        >
                            {t("package.add_limitations_en")}
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                </div>

                {/* reduction */}
                <div className='mt-5' >
                    <label htmlFor="limitations" className="block text-sm font-medium mb-1">
                        {t("package.discount_rules")}
                    </label>
                    {discount_rules?.map((limitation, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div>
                                <label htmlFor={`discount_rules-${index}.from_months`}>{t("package.from_months")}</label>
                                <input
                                    type="number"
                                    id={`discount_rules-${index}.from_months`}
                                    {...register(`discount_rules.${index}.from_months`, {
                                        required: t("package.discount_rules_from_months_required"),
                                    })}
                                    className={`w-full px-4 py-2 border mb-2 rounded-lg focus:outline-none focus:ring-2 ${errors.discount_rules ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
                                        }`}
                                />
                            </div>
                            <div>
                                <label htmlFor={`discount_rules-${index}.from_months`}>{t("package.precent")}</label>
                                <input
                                    type="number"
                                    id={`discount_rules-${index}.percent`}
                                    {...register(`discount_rules.${index}.percent`, {
                                        required: t("package.discount_rules_percent_required"),
                                    })}
                                    className={`w-full px-4 py-2 border mb-2 rounded-lg focus:outline-none focus:ring-2 ${errors.discount_rules ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
                                        }`}
                                />
                            </div>

                            <button
                                type="button"
                                onClick={() => handleDeleteReduction(index)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <Trash className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                    <div className='flex items-center justify-end gap-2'>
                        <button
                            type="button"
                            onClick={() => handleAddReduction()}
                            className="text-blue-500 bg-blue-100 px-2 py-1 rounded-lg flex items-center gap-2 hover:text-blue-700"
                        >
                            {t("package.add_discount_rules")}
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                </div>
            </div>
            {/* Bouton de Soumission */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
                {isSubmitting ? t("...") : t("package.update")}
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

export default UpdateLicenceForm
