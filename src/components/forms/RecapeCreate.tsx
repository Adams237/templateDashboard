import React from 'react'
import { useTranslation } from 'react-i18next'
import { UserInterface } from '../../utils/interfaces/user.interface'


interface RecapProps {
    setStep: (step: number) => void
    onSubmit: () => void,
    microfinance: UserInterface | undefined
}
function RecapeCreate({ setStep, onSubmit, microfinance }: RecapProps) {
    const { t } = useTranslation()
    return (
        <div className="mx-auto w-[90%] p-6 bg-white rounded-2xl shadow-md space-y-6" >
            {/* Progress */}
            <div className="flex justify-center items-center space-x-2">
                <div onClick={() => setStep(1)} className="cursor-pointer bg-gray-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">1</div>
                <div className="h-1 flex-1 bg-green-400" />
                <div onClick={() => setStep(2)} className="cursor-pointer bg-gray-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</div>
                <div className="h-1 flex-1 bg-green-400" />
                <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold cursor-not-allowed">{t('microfinace.end')}</div>
            </div>
            <div className='border w-[90%] mx-auto p-2 space-x-2 space-y-2 rounded-sm ' >
                <div className='grid  ml-2 space-y-2   md:grid-cols-[60%,40%] grid-cols-1'>
                    <div className=' font-semibold'>
                        <span className=' font-bold mr-2 '>{t("microfinace.name")} :</span>{microfinance?.name}
                    </div>
                    <div className=' font-semibold'>
                        <span className=' font-bold mr-2 '>{t("microfinace.email")} :</span>{microfinance?.email}
                    </div>
                    <div className=' font-semibold'>
                        <span className=' font-bold mr-2 '>{t("microfinace.city")} :</span>{microfinance?.city}
                    </div>
                    <div className=' font-semibold'>
                        <span className=' font-bold mr-2 '>{t("microfinace.address")} :</span>{microfinance?.address}
                    </div>
                    <div className=' font-semibold'>
                        <span className=' font-bold mr-2 '>{t("microfinace.phone_number")} :</span>{microfinance?.phone_number}
                    </div>
                    <div className=' font-semibold'>
                        <span className=' font-bold mr-2 '>{t("microfinace.picture")} :</span>
                        <img style={{ width:"75px", height:"75px" }} src={microfinance?.profile_picture} alt="" />
                    </div>
                </div>

                {
                    microfinance?.documents?.map((document, index) => {
                        return (
                            <div className='border-2 p-2' key={index}>
                                <div className=' font-semibold'>
                                    <span className=' font-bold mr-2 '>{t("microfinace.document_type")} :</span>
                                    {document.document_type}
                                </div>
                                <div className=' font-semibold'>
                                    <span className=' font-bold mr-2 '>{t("microfinace.document_number")} :</span>
                                    {document.document_number}
                                </div>
                                <div className='flex flex-row font-semibold'>
                                    <span className=' font-bold mr-2 '>{t("microfinace.file")} :</span>
                                    <img style={{ width:"75px", height:"75px" }} src={document.file_url} alt="" />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <button
                onClick={onSubmit}
                className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
                {t('microfinace.submit')}
            </button>
        </div>
    )
}

export default RecapeCreate