import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useGetAllLicencesQuery } from '../../utils/feature/licence/licenceApi'
import { Loader2 } from 'lucide-react'
import { formaNumber, generateRandomString } from '../../utils/feature/utils'
import { useCreateTenantLicenceMutation } from '../../utils/feature/microfinance/microfinanceApi'
import { toast } from 'react-toastify'
import { LicenceResponse } from '../../utils/feature/licence/type'
import PricingConfigurator from './PlanCard'




function NewTenantLicense() {
    const [page, setPage] = useState(1)
    const { t, i18n } = useTranslation()
    const [selectedLincense, setSelectedLicense] = useState<number>()
    const [planSelected, setPlanSelected] = useState<LicenceResponse>()
    const [taux, setTaux] = useState<{ minMonths: number; percent: number; }[]>([])
    const limit = 10
    const { data: licences, isLoading, isFetching, error } = useGetAllLicencesQuery({ page, limit })
    const [create, { isLoading: loading }] = useCreateTenantLicenceMutation()
    const { id } = useParams()
    const clientId = id ?? ""
    if (isLoading) return <div className='flex items-center justify-center' ><Loader2 className=' animate-spin ' /></div>
    if (error) {
        console.log(error)
        return <div className='flex items-center justify-center text-red-500 font-bold text-xl'>{t("load_error")}</div>
    }
    const handleCreate = async (month:number) => {
        if (!selectedLincense) {
            toast.error(t("microfinace.error_licence_api"))
            return
        }
        try {
            const token = generateRandomString(Number(clientId))
            await create({ user_id: Number(clientId),months:month, license_plan_id: selectedLincense, lang: i18n.language, auth_token: token })
            toast.success(t("microfinace.license_upadte"))
            // onClose()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.data.message)
            console.log(error)
        }
    }
    console.log(licences)
    return (
        <div>
            {
                licences?.data.map(license => {
                    return (
                        <div className='flex items-center space-y-2 flex-row gap-2'>
                            {
                                <div onClick={() => {
                                    setSelectedLicense(license.plan_id)
                                    setPlanSelected(license)
                                    const tauxTmp = license.discount_rules.map((item) => ({
                                        minMonths: item.from_months,
                                        percent: item.percent / 100
                                    })) ?? []
                                    setTaux(tauxTmp)
                                }} className={` flex ${selectedLincense === license.plan_id ? "border-green-500" : "border-gray-400"} items-center justify-center border-2 mt-3 rounded-full w-[25px] h-[25px] `} >
                                    {
                                        selectedLincense === license.plan_id &&
                                        <span className=' h-[80%] w-[80%] rounded-full bg-green-600 ' ></span>
                                    }
                                </div>
                            }
                            <div className=' font-bold text-lg'>
                                {license.name}
                            </div>
                            <div className=' font-bold text-lg text-green-800'>
                                {formaNumber(license.monthly_price)} FCFA<span className=' font-normal text-sm text-black'>/{t("microfinace.mois")}</span>
                            </div>
                            <div className='  '>
                                {t("microfinace.minimu_mount")} :{formaNumber(license.number_of_months)}
                            </div>

                        </div>
                    )
                })
            }
            {
                planSelected &&
                <div className=' mt-10' >
                    <PricingConfigurator
                        plan={planSelected}
                        monthlyPrice={planSelected.monthly_price} 
                        currency="XAF"
                        title={planSelected.name}
                        tiers={taux}
                        loading={loading}
                        locale="fr-FR"
                        defaultMonths={planSelected.min_months}
                        minMonths={planSelected.min_months}
                        maxMonths={taux[taux.length - 1].minMonths}
                        onSubscribe={(p) =>handleCreate(p.months)}
                    />
                </div>
            }
          
            <div className="flex items-center justify-between mt-4">
                <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1 || isFetching}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    ‹ {t("preavu")}
                </button>

                <span>
                    Page {licences?.meta.page} sur {licences?.meta.total_pages}
                    {isFetching && ' …'}
                </span>

                <button
                    onClick={() => setPage((p) => Math.min(p + 1, licences?.meta.total_pages ?? 1))}
                    disabled={page === (licences?.meta.total_pages ?? 1) || isFetching}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    {t("next")} ›
                </button>
            </div>
        </div>
    )
}

export default NewTenantLicense