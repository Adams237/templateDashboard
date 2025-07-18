// src/features/auth/DocumentForm.tsx
import React from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { DocumenetRequest } from '../../utils/feature/document/type'
import { fileToBase64 } from '../../utils/feature/utils'
import imageCompression from 'browser-image-compression';

interface DocumentFormInputs {
    documents: DocumenetRequest[]
}

interface DataProps {
    onSubmit: (data: DocumenetRequest[]) => Promise<void> | void
    setStep: (step: number) => void
}

const DocumentForm: React.FC<DataProps> = ({ onSubmit, setStep }) => {
    const { t } = useTranslation()
    const { control, register, handleSubmit, formState: { errors, isSubmitting } } = useForm<DocumentFormInputs>({
        defaultValues: {
            documents: [{
                document_type: '', document_number: '', file_url: ''
            }]
        }
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'documents'
    })

    const addOne = () => {
        for (let i = 0; i < 1; i++) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            append({ document_type: '', document_number: '', file: null } as any)
        }
    }

    return (
        <form
            onSubmit={handleSubmit(data => onSubmit(data.documents))}
            className="mx-auto w-[90%] p-6 bg-white rounded-2xl shadow-md space-y-6"
        >
            {/* Progress */}
            <div className="flex justify-center items-center space-x-2">
                <div onClick={() => setStep(1)} className="cursor-pointer bg-gray-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">1</div>
                <div className="h-1 flex-1 bg-green-400" />
                <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</div>
                <div className="h-1 flex-1 bg-gray-400" />
                <div className="bg-gray-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold cursor-not-allowed">{t('microfinace.end')}</div>
            </div>

            <h2 className="text-2xl font-bold text-center">{t('microfinace.new')}</h2>

            {/* Bouton Add */}
            <div className="text-right">
                <button
                    type="button"
                    onClick={addOne}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    + {t('Ajouter 1 documents')}
                </button>
            </div>

            {/* Champs dynamiques */}
            <div className="space-y-6">
                {fields.map((field, index) => (
                    <div key={field.id} className="grid md:grid-cols-3 grid-cols-1 gap-4">
                        {/* Document Type */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                {t('microfinace.document_type')} #{index + 1}
                            </label>
                            <input
                                type="text"
                                {...register(`documents.${index}.document_type` as const, {
                                    required: t('microfinace.document_type_required')
                                })}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.documents?.[index]?.document_type
                                        ? 'border-red-500 focus:ring-red-300'
                                        : 'border-gray-300 focus:ring-blue-300'
                                    }`}
                            />
                            {errors.documents?.[index]?.document_type && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.documents[index]!.document_type!.message}
                                </p>
                            )}
                        </div>

                        {/* Document Number */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                {t('microfinace.document_number')} #{index + 1}
                            </label>
                            <input
                                type="text"
                                {...register(`documents.${index}.document_number` as const, {
                                    required: t('microfinace.document_number_required')
                                })}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.documents?.[index]?.document_number
                                        ? 'border-red-500 focus:ring-red-300'
                                        : 'border-gray-300 focus:ring-blue-300'
                                    }`}
                            />
                            {errors.documents?.[index]?.document_number && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.documents[index]!.document_number!.message}
                                </p>
                            )}
                        </div>

                        {/* File */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                {t('microfinace.file')} #{index + 1}
                            </label>
                            <Controller
                                control={control}
                                name={`documents.${index}.file_url` as const}
                                rules={{ required: t('microfinace.file_required') }}
                                render={({ field }) => (
                                    <input
                                        type="file"
                                        accept='image/*'
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
                                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.documents?.[index]?.file_url
                                                ? 'border-red-500 focus:ring-red-300'
                                                : 'border-gray-300 focus:ring-blue-300'
                                            }`}
                                    />
                                )}
                            />
                            {errors.documents?.[index]?.file_url && (
                                <p className="mt-1 text-sm text-red-600">
                                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
                                    {(errors.documents[index]!.file_url as any)!.message}
                                </p>
                            )}
                        </div>

                        {/* Delete button */}
                        <div className="flex items-end">
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                {t('Supprimer')}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Soumission */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
                {isSubmitting ? t('...') : t('microfinace.next')}
            </button>
        </form>
    )
}

export default DocumentForm
