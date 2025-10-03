
import NewLicenceForm from '../../components/forms/NewLicenceForm'
import { useCreateLicenceMutation } from '../../utils/feature/licence/licenceApi'
import { LicenceRequest } from '../../utils/feature/licence/type'
import { useTranslation } from 'react-i18next'
import { toast, ToastContainer } from 'react-toastify'

function NewLicence() {
  const { t, i18n } = useTranslation()
  const [create] = useCreateLicenceMutation()
  const handleCreate = async (data: LicenceRequest) => {
    try {
      const newData: LicenceRequest = {
        ...data,
        popular: data.popular === "true" ? true : false,
        max_transactions: Number(data.max_transactions),
        max_users: Number(data.max_users),
        number_of_months: Number(data.number_of_months),
        monthly_price: Number(data.monthly_price),
        discount_rules: data.discount_rules.map((item) => ({
          from_months: Number(item.from_months),
          percent: Number(item.percent)
        }))
      }
      console.log(newData)
      await create(newData).unwrap()
      toast.success(t("package.success_created"))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error)
      toast.error(i18n.language === "fr" ? error.data.message : error.data.messageE)
    }
  }
  return (
    <div>
      <NewLicenceForm onSubmit={handleCreate} />
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

export default NewLicence