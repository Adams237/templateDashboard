import React, { useState } from 'react'
import NewMicrofinanceForm from '../components/forms/NewMicrofinanceForm'
// import { UserInterface } from '../utils/interfaces/user.interface'
import { DocumenetRequest } from '../utils/feature/document/type'
import DocumentForm from '../components/forms/DocumentForm'
import RecapeCreate from '../components/forms/RecapeCreate'
import { useCreateMicrofinanceMutation } from '../utils/feature/microfinance/microfinanceApi'
import { FormProvider, useForm } from 'react-hook-form'
import { MicrofinanceResponse, MicrofinanceResquest } from '../utils/feature/microfinance/type'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

function NewMicrofinance() {
    const {t} = useTranslation()
    const [step, setStep] = useState(1)
    const navigate = useNavigate()
    const methods = useForm<MicrofinanceResponse>({
        defaultValues: {
            name: '',
            email: '',
            phone_number: '',
            profile_picture: '',
            country: '',
            city: '',
            address: '',
            password_hash: '',
            confirm_password: ''
        }
    })
    const [microfinance, setMicrofinance] = useState<MicrofinanceResquest >({
        name: '',
        email: '',
        phone_number: '',
        profile_picture: '',
        password_hash:'',
        apiUrl:'',
        country: '',
        city: '',
        address: '',
        latitude: 0,
        longitude: 0,
        confirm_password:'',
        documents: [],
    })
    const [newMicrofinance, { isLoading }] = useCreateMicrofinanceMutation()
    const handleNext = (infData: MicrofinanceResquest) => {
        setMicrofinance({ ...infData })
        setStep((prev) => (prev + 1))
    }

    const handleSubmit = (infDocument: DocumenetRequest[]) => {
        if (microfinance) {
            setMicrofinance({
                ...microfinance,
                documents: infDocument
            })
        }
        // console.log(microfinance)
        setStep((prev) => (prev + 1))
    }
    const handleCreate = async () => {
        try {
           await newMicrofinance(microfinance).unwrap()
           toast.success(t("microfinace.success_create"))
           navigate("/clients")

        } catch (error) {
            console.log(error)
        }
        console.log(microfinance)
    }
    return (
        <div className='w-full'>
            <FormProvider {...methods}>
                {step === 1 && <NewMicrofinanceForm setStep={setStep} onSubmit={handleNext} />}
                {step === 2 && <DocumentForm setStep={setStep} onSubmit={handleSubmit} />}
                {step === 3 && <RecapeCreate isLoading={isLoading} microfinance={microfinance} setStep={setStep} onSubmit={handleCreate} />}
            </FormProvider>

        </div>
    )
}

export default NewMicrofinance