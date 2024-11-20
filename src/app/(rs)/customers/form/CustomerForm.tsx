"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import { InputWithLabel } from "@/components/inputs/InputWithLabel"
import { SelectWithLabel } from "@/components/inputs/SelectWithLabel"
import {
  insertCustomerSchema,
  type insertCustomerSchemaType,
  type selectCustomerSchemaType
} from "@/zod-schemas/customer"
import { TextAreaWithLabel } from "@/components/inputs/TextAreaWithLabel"
import { provincesArray } from "@/constants/ProvincesArray"

type Props = {
  customer?: selectCustomerSchemaType
}

export default function CustomerForm({ customer }: Props) {
  const defaultValues: insertCustomerSchemaType = {
    id: customer?.id || 0,
    firstName: customer?.firstName || '',
    lastName: customer?.lastName || '',
    address1: customer?.address1 || '',
    address2: customer?.address2 || '',
    city: customer?.city || '',
    province: customer?.province || '',
    zip: customer?.zip || '',
    phone: customer?.phone || '',
    email: customer?.email || '',
    notes: customer?.notes || ''
  }

  const form = useForm<insertCustomerSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(insertCustomerSchema),
    defaultValues,
  })

  async function submitForm(data: insertCustomerSchemaType) {
    console.log(data)
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <div>
        <h2 className="text-2xl font-bold">
          {customer?.id ? "Bewerken" : "Nieuwe"} Klant Formulier
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
              <div className="flex gap-2">
                <Button
                  type='submit'
                  className='w-3/4'
                  variant='default'
                  title='Opslaan'
                >
                  Save
                </Button>
                <Button
                  type='button'
                  variant='destructive'
                  title='Resetten'
                  onClick={() => form.reset(defaultValues)}
                >
                  Reset
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
