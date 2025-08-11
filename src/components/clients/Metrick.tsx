import React, { useEffect, useState } from 'react'
import { useLazyGetMetrickByIdQuery } from '../../utils/feature/microfinance/microfinanceApi'
import { useParams } from 'react-router-dom'
import { Loader2, User } from 'lucide-react'
import { useTranslation } from 'react-i18next'

function Metrick() {
    const today = new Date()
    const { t } = useTranslation()
    const { id } = useParams()
    const user_id = Number(id)
    const [date, setDate] = useState(today.toISOString().split('T')[0])
    const [getMetrick, { data: metrick, isLoading, error, isFetching }] = useLazyGetMetrickByIdQuery()

    useEffect(() => {
        getMetrick({ user_id, month: date })

    }, [date, getMetrick, user_id])
    console.log(error)
    if (isLoading) return <div className='flex items-center justify-center h-[100%] w-[100%]' ><Loader2 className='w-10 h-10 text-green-500 animate-spin' /></div>
    if (error) return <div className='flex items-center justify-center text-red-500 font-bold text-xl'>{t("load_error")}</div>


    return (
        <div>
            <div className='flex items-center justify-end'>
                <input value={date} onChange={(e) => setDate(e.target.value)} type='date' />
            </div>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500">{t("microfinace.user_mincr")}</p>
                    <p className="text-2xl font-semibold">
                        {isFetching ? <Loader2 className=' animate-spin' /> : metrick?.current_users}
                    </p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                    <User size={24} className="text-green-600" />
                </div>
            </div>

        </div>
    )
}

export default Metrick