import React from 'react'
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { MicrofinanceResponse } from '../utils/feature/microfinance/type';
import UpdateInfo from '../components/forms/Settings/UpdateInfo';
import { useUpdateInforMutation } from '../utils/feature/auth/authApi';
import { toast } from 'react-toastify';

function SettingsUpdaInf() {
    const { t } = useTranslation()
    const location = useLocation().state;
    const [update] = useUpdateInforMutation()
    
    const handleUpdate = async(data:MicrofinanceResponse)=>{
        try {
            await update(data).unwrap()
            toast.success(t("settings.unpdate_success"))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
            console.log(error)
            toast.error(error.data.message)
        }
    }

    return (
        <div className='w-full' >
            <UpdateInfo  defaultValue={location} onSubmit={handleUpdate} />
        </div>
    )
}

export default SettingsUpdaInf
