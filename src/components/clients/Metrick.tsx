import React, { useEffect, useState } from 'react'
import {  useLazyGetMetrickByIdQuery } from '../../utils/feature/microfinance/microfinanceApi'
import { useParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

function Metrick() {
    const today = new Date()
    const {t} = useTranslation()
    const {id} = useParams()
    const user_id = Number(id) 
    const [date, setDate] = useState(today.toISOString().split('T')[0])
    const [getMetrick,{data:metrick, isLoading, error, isFetching }] = useLazyGetMetrickByIdQuery()

    useEffect(() => {
        getMetrick({user_id, month:date})
    
    }, [date, getMetrick, user_id])
    if (isLoading) return <div className='flex items-center justify-center h-[50vh] w-[70vw]' ><Loader2 className='w-52 h-52 text-green-500 animate-spin' /></div>
    if (error) return <div className='flex items-center justify-center text-red-500 font-bold text-xl'>{t("load_error")}</div>

  
   console.log(metrick)
   console.log(today.toISOString().split('T')[0].slice(0,8))
    return (
        <div>
            <div className='flex items-center justify-end'>
                 <input value={date} onChange={(e)=>setDate(e.target.value)} type='date' />
            </div>
            <div className='flex flex-row gap-1'>
                {t("microfinace.user_mincr")} : <span>{ isFetching?<Loader2 className=' animate-spin' />: metrick?.current_users }</span>
            </div>
            
        </div>
    )
}

export default Metrick