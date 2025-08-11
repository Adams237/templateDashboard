import React from 'react'
import { useLocation } from 'react-router-dom';
import UpdateForm from '../../components/forms/Clients/UpdateForm';
import { MicrofinanceResponse } from '../../utils/feature/microfinance/type';
import { useTranslation } from 'react-i18next';
import { useUpdateMicorfinanceMutation } from '../../utils/feature/microfinance/microfinanceApi';
import { toast } from 'react-toastify';

function UpdateClientPage() {
    const location = useLocation().state;
    const {t} = useTranslation()
    const [update] = useUpdateMicorfinanceMutation()

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
            <UpdateForm defaultValue={location} onSubmit={handleUpdate} />
        </div>
    )
}

export default UpdateClientPage
