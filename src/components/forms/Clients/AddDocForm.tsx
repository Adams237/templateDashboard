import React from 'react'
import { DocumenetRequest } from '../../../utils/feature/document/type'
import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'
import imageCompression from 'browser-image-compression';
import { fileToBase64 } from '../../../utils/feature/utils'
import { Loader2, Trash } from 'lucide-react';

interface DataProps {
    onSubmit: (data: DocumenetRequest) => Promise<void> | void,
}

const AddDocForm: React.FC<DataProps> = ({ onSubmit }) => {
    const { t } = useTranslation()
    const {
        control,
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<DocumenetRequest>()
    const preview = watch('file_url') as string | undefined
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className=" space-y-6"
        >
            <div className='grid  grid-cols-1 space-x-2'>
                <div className='ml-2'>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                        {t("microfinace.document_number")}
                    </label>
                    <input
                        id="microfinace"
                        type="text"
                        {...register('document_number', {
                            required: t("microfinace.document_number"),
                        })}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.document_number
                            ? 'border-red-500 focus:ring-red-300'
                            : 'border-gray-300 focus:ring-blue-300'
                            }`}
                    />
                    {errors.document_number && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.document_number.message}
                        </p>
                    )}
                </div>
                <div className='ml-2'>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                        {t("microfinace.document_number")}
                    </label>
                    <input
                        id="microfinace"
                        type="text"
                        {...register('document_type', {
                            required: t("microfinace.document_type"),
                        })}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.document_type
                            ? 'border-red-500 focus:ring-red-300'
                            : 'border-gray-300 focus:ring-blue-300'
                            }`}
                    />
                    {errors.document_type && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.document_type.message}
                        </p>
                    )}
                </div>
                {/* Picture */}
                <div>
                    <label htmlFor="Picture" className="block text-sm font-medium mb-1">
                        {t("microfinace.picture")}
                    </label>
                    <Controller
                        name="file_url"
                        control={control}
                        rules={{ required: t('microfinace.file_url') }}
                        render={({ field }) => (
                            <>
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
                                    className={` w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2  ${errors.file_url
                                        ? 'border-red-500 focus:ring-red-300'
                                        : 'border-gray-300 focus:ring-blue-300'}
                                `}
                                />
                                {preview && (
                                    <div className="mt-3 flex flex-row items-start">
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="mt-2 max-h-20 rounded border"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setValue('file_url', '' )} // nettoie l’aperçu
                                            className="mt-2 text-sm text-red-600 underline"
                                        >
                                            <Trash/>
                                        </button>
                                    </div>
                                )}
                            </>


                        )}
                    />
                    {errors.file_url && (
                        <p className="mt-1 text-sm text-red-600">{errors.file_url.message}</p>
                    )}
                </div>

            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 bg-blue-600 text-white flex justify-center items-center rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
                {isSubmitting ? <Loader2 className=' animate-spin ' /> : t("microfinace.save")}
            </button>

        </form>
    )
}

export default AddDocForm
