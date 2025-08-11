import React from 'react'
import { useTranslation } from 'react-i18next'
import AddDocForm from '../forms/Clients/AddDocForm'
import { useCreateDocumentMutation } from '../../utils/feature/microfinance/microfinanceApi'
import { DocumenetRequest } from '../../utils/feature/document/type'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'


function AddDocument() {
    const { t, i18n } = useTranslation()
    const [create] = useCreateDocumentMutation()
    const { id } = useParams()
    const clientId = id ?? ""

    const handleSubmit = async (data: DocumenetRequest) => {
        try {
            await create({user_id:Number(clientId), document:data, lang:i18n.language})
            toast.success(t("microfinace.document_success"))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
            toast.error(error.data.message)
        }
    }

    return (
        <div className='h-[350px] overflow-y-auto'>
            <AddDocForm onSubmit={handleSubmit} />
        </div>
    )
}

export default AddDocument
