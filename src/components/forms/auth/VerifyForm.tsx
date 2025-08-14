import React, { useRef, useState, type KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logIn } from '../../../utils/redux/slice/user.slice'
import { toast } from 'react-toastify'
import { useDarkMode } from '../../../Hooks/hooks'
import { Moon, Sun } from 'lucide-react'

interface VerifyFormProps {
    phone_number: string
}
function VerifyForm({ phone_number }: VerifyFormProps) {
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [code, setCode] = useState<string[]>(['', '', '', '', '', ''])
    const inputRefs = useRef<Array<HTMLInputElement | null>>([])
    const { isDark, setIsDark } = useDarkMode();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        const val = e.target.value
        if (!/^\d?$/.test(val)) return         // n’accepte qu’un seul chiffre
        const newCode = [...code]
        newCode[idx] = val
        setCode(newCode)
        if (val && idx < inputRefs.current.length - 1) {
            // si chiffre saisi, on focus l’input suivant
            inputRefs.current[idx + 1]?.focus()
        }
    }


    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, idx: number) => {
        if (e.key === 'Backspace' && !code[idx] && idx > 0) {
            const prev = inputRefs.current[idx - 1]
            prev?.focus()
            const newCode = [...code]
            newCode[idx - 1] = ''
            setCode(newCode)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const otp = code.join('')
        if (otp.length < 6) {
            alert('Veuillez saisir les 6 chiffres.')
            return
        }
        try {
            const user = {
                id: "1",
                email: "admin@gmail.com",
                name: "Adams",
                phone_number
            }

            dispatch(logIn({ user: user, token: ";osudhuwieeqnwydqdp9qwd", permission: [] }))
            navigate("/")
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(i18n.language === "fr" ? error.data.message : error.data.messageE)
        }

    }


    const handleChangeLanguage = (lang: string) => {
        i18n.changeLanguage(lang)
    }
    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl dark:bg-slate-950 dark:text-slate-100 shadow-md w-full max-w-sm text-center space-y-6"
        >
            <div className=' flex items-center  justify-end'>
                <div
                    onClick={() => setIsDark(!isDark)}
                    className="inline-flex  justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                    aria-label="Toggle theme"
                >
                    {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </div>
                <select value={i18n.language} onChange={(e) => handleChangeLanguage(e.target.value)} name="" id="">
                    <option className='dark:text-black' value="fr">Francais</option>
                    <option className='dark:text-black' value="en">English</option>
                </select>
            </div>
            <h1 className="text-2xl font-semibold">{t("login.verify")}</h1>
            <p className="text-gray-600">{t("login.enter_otp_code")}</p>

            <div className="flex justify-between space-x-2">
                {code.map((digit, idx) => (
                    <input
                        key={idx}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={e => handleChange(e, idx)}
                        onKeyDown={e => handleKeyDown(e, idx)}
                        ref={(el) => { inputRefs.current[idx] = el!; }}
                        className="w-12 h-12 text-xl text-center border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                ))}
            </div>

            <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
                {t("login.verify_buttom")}
            </button>
        </form>
    )
}

export default VerifyForm
