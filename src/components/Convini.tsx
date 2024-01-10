import { useFormContext } from "react-hook-form"
import { FormType } from "./validator"
import { ErrorMessage } from "@hookform/error-message"

const covniniOptions = [
  { value: "familyMart", label: "ファミリーマート" },
  { value: "sevenEleven", label: "セブンイレブン" },
  { value: "lawson", label: "ローソン" },
]

export const Convini = ({ isActive }: { isActive: boolean }) => {
  const {
    formState: { errors },
    register,
  } = useFormContext<FormType>()

  return (
    <label className="flex border-gray-200 w-full rounded-lg border py-4 px-4">
      <input type="radio" value="convini" {...register("selectedPaymentMethod")} />
      
      <div className="ml-4">
        <p className="text-sm font-semibold text-white">コンビニ決済</p>
        {isActive && (
          <div className="flex mt-4 items-center">
            <select {...register("convini.conviniName")} defaultValue="" className="border border-gray-300 rounded">
              <option key="default" value="" disabled>
                選択してください
              </option>
              {covniniOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <ErrorMessage
              errors={errors}
              name="convini.conviniName"
              render={({ message }) => <p className="text-red-500 text-xs">{message}</p>}
            />
          </div>
        )}
      </div>
    </label>
  )
}