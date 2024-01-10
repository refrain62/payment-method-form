/**
 * バリデート設定
 */

import dayjs from "dayjs"
import { z } from "zod"

export type PaymentMethodType = "card" | "bank" | "convini"

type ConviniName = "familyMart" | "sevenEleven" | "lawson"

export const currentYear = dayjs().year()

// クレジットカード用バリデート
const isValidCreditCardNumber = (cardNumber: string) => {
  const number = cardNumber.replace(/\s+/g, "")

  // 数字だけ
  if (!/^\d+$/.test(number)) {
    return false
  }

  let total = 0
  let isEven = false

  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number[i], 10)

    if (isEven) {
      digit *= 2

      if (digit > 9) {
        digit -= 9
      }
    }

    total += digit
    isEven = !isEven
  }
  
  return total % 10 === 0
}

// カード確認番号（3 or 4桁の数字）
const isValidCvc = (cvc: string) => {
  return /^\d{3,4}$/.test(cvc)
}

// バリデート設定
export const schema = z.discriminatedUnion("selectedPaymentMethod", [
  z.object({
    selectedPaymentMethod: z.literal("card"),
    card: z.object({
      number: z.string().refine(isValidCreditCardNumber, { message: "カード番号が正しくありません" }),
      name: z.string().min(1, { message: "名前を入力してください" }),
      expiry: z.object({
        year: z.string().nonempty("選択してください"),
        month: z.string().nonempty("選択してください"),
      }),
      cvc: z.string().refine(isValidCvc, { message: "正しいCVCを入力してください" }),
    }),
  }),

  z.object({
    selectedPaymentMethod: z.literal("convini"),
    convini: z.object({
      conviniName: z.custom<ConviniName>(),
    }),
  }),

  z.object({
    selectedPaymentMethod: z.literal("bank"),
  }),
])

export type FormType = z.infer<typeof schema>