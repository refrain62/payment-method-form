import { useFormContext, useWatch } from "react-hook-form"
import { FormType, currentYear } from "./validator"
import { ErrorMessage } from "@hookform/error-message"

const monthOptions = [...Array(12)].map((_, index) => ({
  value: `0${index + 1}`.slice(-2),
  label: `0${index + 1}`.slice(-2),
}))

const yearOptions = [...Array(10)].map((_, index) => ({
  value: String(currentYear + index),
  label: String(currentYear + index),
}))

export const Card = ({ isActive }: { isActive: boolean }) => {
  const {
    formState: { errors },
    register,
    control,
  } = useFormContext<FormType>()

  const year = useWatch({ control: control, name: "card.expiry.year" })
  const month = useWatch({ control: control, name: "card.expiry.month" })

  let path = ""
  if (!year) {
    path = "card.expiry.year"
  } else if (!month) {
    path = "card.expiry.month"
  }

  return (
    <label className="flex w-full rounded-lg border py-4 px-4 border-gray-200 gap-y-4">
      <input type="radio" value="card" {...register("selectedPaymentMethod")} />

      <div className="ml-4 flex-grow">
        <p className="text-sm font-semibold text-white">カード</p>
        {isActive && (
          <>
            <div className="pb-3 mt-3 border-t border-gray" />
            <div className="flex flex-col gap-y-3">
              <div className="flex flex-col gap-y-1">
                <p className="text-sm">カード番号</p>
                <input {...register("card.number")} className="h-8 border border-gray-300 rounded" />
                <ErrorMessage
                  errors={errors}
                  name="card.number"
                  render={({ message }) => <p className="text-red-500 text-xs">{message}</p>}
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <p className="text-sm">氏名</p>
                <input {...register("card.name")} className="h-8 border border-gray-300 rounded" />
                <ErrorMessage
                  errors={errors}
                  name="card.name"
                  render={({ message }) => <p className="text-red-500 text-xs">{message}</p>}
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <p className="text-sm">有効期限</p>
                <div className="flex gap-x-2">
                  <select
                    {...register("card.expiry.year")}
                    defaultValue=""
                    autoComplete="cc-exp-year"
                    className="w-1/2 h-8 border rounded border-gray-300"
                  >
                    <option key="default" value="" disabled>
                      年
                    </option>
                    {yearOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <select
                    {...register("card.expiry.month")}
                    defaultValue=""
                    autoComplete="cc-exp-month"
                    className="w-1/2 h-8 border rounded border-gray-300"
                  >
                    <option key="default" value="" disabled>
                      月
                    </option>
                    {monthOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <ErrorMessage
                  errors={errors}
                  name={path}
                  render={({ message }) => <p className="text-red-500 text-xs">{message}</p>}
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <p className="text-sm">セキュリティコード</p>
                <input {...register("card.cvc")} className="h-8 border border-gray-300 rounded" />
                <ErrorMessage
                  errors={errors}
                  name="card.cvc"
                  render={({ message }) => <p className="text-red-500 text-xs">{message}</p>}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </label>
  )
}
