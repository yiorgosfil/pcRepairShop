'use client'

import { useFormContext } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type DataObj = {
  id: string
  description: string
}

type Props<S> = {
  fieldTitle: string
  nameInSchema: keyof S & string
  data: DataObj[]
  className?: string
}

export function SelectWithLabel<S>({
  fieldTitle, nameInSchema, data, className
}: Props<S>) {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem>
          <FormLabel
            className="text-base"
            htmlFor={nameInSchema}
          >
            {fieldTitle}
          </FormLabel>
          <Select
            {...field}
            onValueChange={field.onChange}
          >
            <FormControl>
              <SelectTrigger
                id={nameInSchema}
                className={`w-full max-w-xs ${className}`}
              >
                <SelectValue placeholder='Selecteren' />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {data.map(province => (
                <SelectItem
                  key={`${nameInSchema}_${province.id}`}
                  value={province.id}
                >
                  {province.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

