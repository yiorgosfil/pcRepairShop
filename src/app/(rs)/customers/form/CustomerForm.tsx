"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import { InputWithLabel } from "@/components/inputs/InputWithLabel"
import { SelectWithLabel } from "@/components/inputs/SelectWithLabel"
import { TextAreaWithLabel } from "@/components/inputs/TextAreaWithLabel"
import { CheckboxWithLabel } from "@/components/inputs/CheckboxWithLabel"
import {
  insertCustomerSchema,
  type insertCustomerSchemaType,
  type selectCustomerSchemaType
} from "@/zod-schemas/customer"
import { provincesArray } from "@/constants/ProvincesArray"
import { useAction } from 'next-safe-action/hooks'
import { saveCustomerAction } from "@/app/actions/saveCustomerAction"
import { useToast } from "@/hooks/use-toast"
import { LoaderCircle } from 'lucide-react'
import { DisplayServerActionResponse } from "@/components/DisplayServerActionResponse"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

type Props = {
  customer?: selectCustomerSchemaType
  isManager?: boolean | undefined
}

export default function CustomerForm({ customer, isManager = false }: Props) {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const hasCustomerId = searchParams.has('customerId')

  const emptyValues: insertCustomerSchemaType = {
    id: 0,
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    province: '',
    zip: '',
    phone: '',
    email: '',
    notes: '',
    active: true,

  }

  const defaultValues: insertCustomerSchemaType = hasCustomerId ? {
    id: customer?.id ?? 0,
    firstName: customer?.firstName ?? '',
    lastName: customer?.lastName ?? '',
    address1: customer?.address1 ?? '',
    address2: customer?.address2 ?? '',
    city: customer?.city ?? '',
    province: customer?.province ?? '',
    zip: customer?.zip ?? '',
    phone: customer?.phone ?? '',
    email: customer?.email ?? '',
    notes: customer?.notes ?? '',
    active: customer?.active ?? true
  } : emptyValues

  const form = useForm<insertCustomerSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(insertCustomerSchema),
    defaultValues,
  })

  useEffect(() => {
    form.reset(hasCustomerId ? defaultValues : emptyValues)
  }, [searchParams.get('customerId')])

  const {
    execute: executeSave,
    result: saveResult,
    isPending: isSaving,
    reset: resetSaveAction,
  } = useAction(saveCustomerAction, {
    onSuccess({ data }) {
      if (data?.message) {
        toast({
          variant: 'default',
          title: 'Succes',
          description: data?.message,
        })
      }
    },
    onError({ error }) {
      toast({
        variant: 'destructive',
        title: 'Fout',
        description: 'Opslaan mislukt',
      })
    }
  })

  async function submitForm(data: insertCustomerSchemaType) {
    executeSave(data)
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <DisplayServerActionResponse result={saveResult} />
      <div>
        <h2 className="text-2xl font-bold">
          {customer?.id ? "Bewerken" : "Nieuwe"} Klant {customer?.id ? `#${customer.id}` : 'Formulier'}
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitForm)}
            className="flex flex-col md:flex-row gap-4 md:gap-8"
          >
            <div className='flex flex-col gap-4 w-full max-w-xs'>
              <InputWithLabel<insertCustomerSchemaType>
                fieldTitle="Voornaam"
                nameInSchema="firstName"
              />
              <InputWithLabel<insertCustomerSchemaType>
                fieldTitle="Achternaam"
                nameInSchema="lastName"
              />
              <InputWithLabel<insertCustomerSchemaType>
                fieldTitle="Adres 1"
                nameInSchema="address1"
              />
              <InputWithLabel<insertCustomerSchemaType>
                fieldTitle="Adres 2"
                nameInSchema="address2"
              />
              <InputWithLabel<insertCustomerSchemaType>
                fieldTitle="Plaats"
                nameInSchema="city"
              />
              <SelectWithLabel<insertCustomerSchemaType>
                fieldTitle='Provincie'
                nameInSchema="province"
                data={provincesArray}
              />
            </div>
            <div className='flex flex-col gap-4 w-full max-w-xs'>
              <InputWithLabel<insertCustomerSchemaType>
                fieldTitle="Postcode"
                nameInSchema="zip"
              />
              <InputWithLabel<insertCustomerSchemaType>
                fieldTitle="E-mail"
                nameInSchema="email"
              />
              <InputWithLabel<insertCustomerSchemaType>
                fieldTitle="Telefoon"
                nameInSchema="phone"
              />
              <TextAreaWithLabel<insertCustomerSchemaType>
                fieldTitle='Notities'
                nameInSchema="notes"
                className="h-40"
              />

              {isManager && customer?.id ? (
                <CheckboxWithLabel<insertCustomerSchemaType>
                  fieldTitle='Actief'
                  nameInSchema="active"
                  message="Ja"
                />
              ) : null}

              <div className="flex gap-2">
                <Button
                  type='submit'
                  className='w-3/4'
                  variant='default'
                  title='Opslaan'
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <LoaderCircle className='animate-spin' /> Opslaan...
                    </>
                  ) : 'Opslaan'}
                </Button>
                <Button
                  type='button'
                  variant='destructive'
                  title='Resetten'
                  onClick={() => {
                    form.reset(defaultValues)
                    resetSaveAction()
                  }}
                >
                  Resetten
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
