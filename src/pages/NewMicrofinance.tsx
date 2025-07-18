import React, { useState } from 'react'
import NewMicrofinanceForm from '../components/forms/NewMicrofinanceForm'
import { UserInterface } from '../utils/interfaces/user.interface'
import { DocumenetRequest } from '../utils/feature/document/type'
import DocumentForm from '../components/forms/DocumentForm'
import RecapeCreate from '../components/forms/RecapeCreate'

function NewMicrofinance() {
    const [step, setStep] = useState(1)
    const [microfinance, setMicrofinance] = useState<UserInterface | undefined>(undefined)
    const handleNext=(infData:UserInterface)=>{
        setMicrofinance({...infData})
        setStep((prev)=>(prev+1))
    }

    const handleSubmit=(infDocument:DocumenetRequest[])=>{
        if (microfinance ) {
            setMicrofinance({
                ...microfinance,
                documents:infDocument
            })
        }
        // console.log(microfinance)
        setStep((prev)=>(prev+1))
    }
    const handleCreate = ()=>{
        console.log(microfinance)
    }
  return (
    <div className='w-full'>
       {step ===1 && <NewMicrofinanceForm setStep={setStep} onSubmit={handleNext} />}
       {step ===2 && <DocumentForm setStep={setStep} onSubmit={handleSubmit} />}
       {step ===3 && <RecapeCreate microfinance={microfinance} setStep={setStep} onSubmit={handleCreate} />}
    </div>
  )
}

export default NewMicrofinance