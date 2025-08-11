import React from 'react'
import PasswordForm, { PassworDProps } from '../components/forms/Settings/PasswordForm'
import { useUpdatePasswordMutation } from '../utils/feature/auth/authApi'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

function UpdatePassord() {
  const { t, i18n } = useTranslation()
  const [update] = useUpdatePasswordMutation()
  const handleUpdate = async (data: PassworDProps) => {
    try {
      await update({ old_password: data.old_password, new_password: data.new_password, lang: i18n.language.includes("fr") ? "fr" : "en" }).unwrap()
      toast.success(t("settings.unpdate_success"))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error)
      toast.error(error.data.message)
    }
  }
  return (
    <div className='w-full' >
      <PasswordForm onSubmit={handleUpdate} />
    </div>
  )
}

export default UpdatePassord
