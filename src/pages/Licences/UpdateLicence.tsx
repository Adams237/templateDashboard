import React from 'react'
import {  useUpdateLicenceMutation } from '../../utils/feature/licence/licenceApi'
import {  LicenceResponse } from '../../utils/feature/licence/type'
import { useTranslation } from 'react-i18next'
import { toast, ToastContainer } from 'react-toastify'
import UpdateLicenceForm from '../../components/forms/UpdateLicenceForm'

interface UpdateProps{
    licence:LicenceResponse
    onClose:()=>void
}

function UpdateLicence({licence,onClose}:UpdateProps) {
  const { t, i18n } = useTranslation()
  const [create] = useUpdateLicenceMutation()
  const handleCreate = async (data: LicenceResponse) => {
    console.log(data)
    try {
      const newData:LicenceResponse = {
        ...data,
        max_transactions:Number(data.max_transactions),
        max_users:Number(data.max_users),
        number_of_months :Number(data.number_of_months), 
        monthly_price:Number(data.monthly_price)
      }
      await create({id:data.plan_id.toString(),credential: newData}).unwrap()
      toast.success(t("package.success_update"))
      onClose()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error)
      toast.error(i18n.language === "fr" ? error.data.message : error.data.messageE)
    }
  }
  return (
    <div>
      <UpdateLicenceForm licence={licence} onSubmit={handleCreate} />
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
    </div>
  )
}

export default UpdateLicence