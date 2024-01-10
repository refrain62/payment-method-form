/**
 * 支払選択フォーム
 */
import { FormProvider, useForm, useWatch } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormType, PaymentMethodType, schema } from "@/components/validator"
import { Card } from "@/components/Card"
import { Convini } from "@/components/Convini"
import { Bank } from "@/components/Bank"
import { isatty } from "tty"

import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })


// 支払方法選択肢
const PaymentMethods = ["card", "convini", "bank"] as const


export default function PaymentForm() {
  // フォーム初期値設定
  const formMethods = useForm<FormType>({
    defaultValues: {
      selectedPaymentMethod: undefined,
      card: {
        number: undefined,
        name: undefined,
        expiry: {
          year: undefined,
          month: undefined
        },
        cvc: undefined,
      },
      convini: {
        conviniName: undefined,
      },
    },
    mode: "onBlur",
    resolver: zodResolver(schema),
    shouldFocusError: false,
  })

  const onSubmit = (data: FormType) => console.log(data)
  const selectedPaymentMethod = useWatch({
    control: formMethods.control,
    name: "selectedPaymentMethod"
  })
  const isActive = (paymentMethod: PaymentMethodType) => paymentMethod === selectedPaymentMethod

  return (
    <>
      <Head>
        <title>支払選択フォーム</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>

        <FormProvider {...formMethods}>
          <form
            onSubmit={formMethods.handleSubmit(onSubmit)}
            className="flex flex-col w-screen h-screen justify-center items-center"
            >
              <p className="text-xl font-semibold">
                支払い方法
              </p>
              <ErrorMessage
                errors={formMethods.formState.errors}
                name="selectedPaymentMethod"
                render={() => {
                  return (
                    <p className="text-red-500 text-base">
                      いずれかを選択してください
                    </p>
                  )
                }}
                />

              <div className="mt-2 flex flex-col gap-y-4 w-80 text-white-500">
                {PaymentMethods.map((method) => {
                  switch (method) {
                    case "card":
                      return <Card isActive={isActive(method)} />

                    case "convini":
                    return <Convini isActive={isActive(method)} />
                    
                    case "bank":
                    return <Bank />
                  }
                })}
              </div>

              <button
                type="submit"
                className="mt-4 p-4 border border-blue-500 rounded text-blue-500"
                >
                  送信！
              </button>
          </form>
        </FormProvider>
      </main>
    </>
  )
}
