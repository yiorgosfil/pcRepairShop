import { getCustomer } from "@/lib/queries/getCustomer";
import { BackButton } from '@/components/BackButton'
import * as Sentry from '@sentry/nextjs'
import CustomerForm from "./CustomerForm";

type SearchParams = Promise<{ [key: string]: string | undefined }>

export async function generateMetadata({
  searchParams
}: {
  searchParams: SearchParams
}) {
  const { customerId } = await searchParams
  if (!customerId) return { title: 'Nieuwe Klant' }
  return {
    title: `Klant Bewerken #${customerId}`
  }
}

export default async function CustomerFormPage({ searchParams }: { searchParams: SearchParams }) {
  try {
    const { customerId } = await searchParams;

    if (customerId) {
      const customer = await getCustomer(parseInt(customerId))

      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">Customer ID #{customerId} not found.</h2>
            <BackButton title="Go Back" variant="default" />
          </>
        )
      }
      console.log(customer)
      return <CustomerForm customer={customer} />
    } else {
      return <CustomerForm />
    }
  } catch (error) {
    if (error instanceof Error) {
      Sentry.captureException(error)
      throw error
    }

  }
}
