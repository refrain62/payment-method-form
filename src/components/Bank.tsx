import { useFormContext } from "react-hook-form";
import { FormType } from "./validator"

export const Bank = () => {
  const { register } = useFormContext<FormType>()

  return (
    <label
      className="flex flex-col border-gray-200 w-full rounded-lg border py-4 px-4"
      >
      <div className="flex">
        <input type="radio" value="bank" {...register("selectedPaymentMethod")} />

        <div className="flex items-center gap-x-3">
          <div className="text-left">
            <p className="ml-4 text-sm font-semibold text-white">
              銀行振込
            </p>
          </div>
        </div>
      </div>
    </label>
  )
}