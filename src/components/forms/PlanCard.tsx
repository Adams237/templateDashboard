import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { PricingConfiguratorProps } from "../../utils/feature/licence/type";
import { clamp, fractionDigitsFor, getDiscountPercent } from "../../utils/feature/utils";
import { Loader2 } from "lucide-react";






export default function PricingConfigurator({
    plan,
    monthlyPrice,
    currency = 'XAF',
    locale = 'fr-FR',
    minMonths = 1,
    maxMonths = 36,
    defaultMonths = 12,
    loading,
    tiers,
    title = 'Choisissez votre abonnement',
    onSubscribe,
}: PricingConfiguratorProps) {
    const [months, setMonths] = useState<number>(clamp(defaultMonths, minMonths, maxMonths))
    const { t } = useTranslation()
    const digits = useMemo(() => fractionDigitsFor(currency), [currency])
    const fmt = useMemo(
        () => new Intl.NumberFormat(locale, { style: 'currency', currency, minimumFractionDigits: digits, maximumFractionDigits: digits }),
        [locale, currency, digits]
    )
    const discountPercent = useMemo(() => getDiscountPercent(months, tiers ?? []), [months, tiers])
    const subtotal = months * monthlyPrice
    const discountAmount = subtotal * discountPercent
    const total = subtotal - discountAmount
    const effectiveMonthly = total / months
    const quick = [1, 3, 6, 12, 24, 36].filter((m) => m >= minMonths && m <= maxMonths)

    const handleSubscribe = () => {
        onSubscribe?.({
            months,
            baseMonthly: monthlyPrice,
            discountPercent,
            subtotal,
            discountAmount,
            total,
            effectiveMonthly,
            plan: plan
        })
    }

    return (
        <div className="w-full flex items-center justify-center p-2 ">
            <div className="grid w-[90%] gap-6 md:grid-cols-[60%,40%]">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ">
                    <div className="py-2" >
                        {t("pricing2.init_paiement")} <span className="font-bold" >{title}</span>
                    </div>

                    <label htmlFor="months" className="block text-sm font-medium text-slate-700 ">
                        {t("pricing2.choose_month")}
                    </label>

                    <div className="mt-2 flex items-center gap-2">
                        <button
                            type="button"
                            aria-label="Diminuer le nombre de mois"
                            onClick={() => setMonths((m) => clamp(m - 1, minMonths, maxMonths))}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50 active:scale-95 "
                        >
                            −
                        </button>

                        <input
                            id="months"
                            type="number"
                            inputMode="numeric"
                            min={minMonths}
                            max={maxMonths}
                            value={months}
                            onChange={(e) => setMonths(clamp(Number(e.target.value || 0), minMonths, maxMonths))}
                            className="h-9 w-24 rounded-lg border border-slate-300 bg-white px-3 text-center text-sm outline-none focus:ring-2 focus:ring-blue-500 "
                        />

                        <button
                            type="button"
                            aria-label="Augmenter le nombre de mois"
                            onClick={() => setMonths((m) => clamp(m + 1, minMonths, maxMonths))}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50 active:scale-95 "
                        >
                            +
                        </button>
                    </div>


                    <input
                        type="range"
                        min={minMonths}
                        max={maxMonths}
                        value={months}
                        onChange={(e) => setMonths(Number(e.target.value))}
                        className="mt-4 w-full accent-blue-600"
                    />

                    <div className="mt-3 flex flex-wrap gap-2">
                        {quick.map((m) => (
                            <button
                                key={m}
                                type="button"
                                onClick={() => setMonths(m)}
                                className={
                                    'rounded-lg border px-3 py-1.5 text-sm ' +
                                    (months === m
                                        ? 'border-blue-600 bg-blue-50 text-blue-700 '
                                        : 'border-slate-300 text-slate-700 hover:bg-slate-100 ')
                                }
                            >
                                {m} {t("pricing2.month")}
                            </button>
                        ))}
                    </div>


                    <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600 ">
                        <p className="font-bold mb-2 text-[15px]">{t("pricing2.reduction_palier")}</p>
                        <ul className="grid grid-cols-2 gap-1 ">
                            {(tiers ?? [])
                                .sort((a, b) => a.minMonths - b.minMonths)
                                .map((value, i) => (
                                    <li key={i} className="flex h-8 items-center justify-between gap-2 rounded-lg bg-white px-2 py-1 ">
                                        <span className="font-semibold" >{value.minMonths}+ {t("pricing2.month")}</span>
                                        <span className="font-semibold text-green-600">−{Math.round(value.percent * 100)}%</span>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>


                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ">
                    <div className="flex items-start justify-between">
                        <h3 className="text-base font-semibold text-slate-800 ">{t("pricing2.detail_paiement")}</h3>
                        <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-800 ">
                            {Math.round(discountPercent * 100)}% OFF
                        </span>
                    </div>

                    <dl className="mt-4 space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                            <dt className="text-slate-600 ">{t("pricing2.duration")}</dt>
                            <dd className="font-medium">{months} {t("pricing2.month")}</dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-slate-600 ">{t("pricing2.base_price")}</dt>
                            <dd className="font-medium">{fmt.format(monthlyPrice)} / {t("pricing2.month")}</dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-slate-600 ">{t("pricing2.subtotal")}</dt>
                            <dd className="font-medium">{fmt.format(subtotal)}</dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-slate-600 ">{t("pricing2.reduction")} ({Math.round(discountPercent * 100)}%)</dt>
                            <dd className="font-medium text-emerald-600 ">−{fmt.format(discountAmount)}</dd>
                        </div>
                        <div className="mt-2 h-px bg-slate-200 " />
                        <div className="flex items-center justify-between text-base">
                            <dt className="font-semibold text-slate-800 ">Total</dt>
                            <dd className="font-bold">{fmt.format(total)}</dd>
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-500 ">
                            <dt>{t("pricing2.effectif_price")} / {t("pricing2.month")}</dt>
                            <dd>{fmt.format(effectiveMonthly)}</dd>
                        </div>
                    </dl>

                    <button
                        type="button"
                        disabled={loading}
                        onClick={handleSubscribe}
                        className="mt-5 w-full rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white shadow hover:bg-blue-700 active:translate-y-[1px]"
                    >
                         {loading ? <Loader2 className=' animate-spin' /> : t("microfinace.create")}
                    </button>


                </div>
            </div>
        </div>
    )
}
