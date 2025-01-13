import { getCustomer } from "@/lib/queries/getCustomer";
import { BackButton } from '@/components/BackButton'
import * as Sentry from '@sentry/nextjs'
import CustomerForm from "./CustomerForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

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
    const { getPermission } = getKindeServerSession()
    const managerPermission = await getPermission('manager')
    const isManager = managerPermission?.isGranted

    const { customerId } = await searchParams;

    if (customerId) {
      const customer = await getCustomer(parseInt(customerId))

      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">Klant-ID #{customerId} niet gevonden.</h2>
            <BackButton title="Ga Terug" variant="default" />
          </>
        )
      }

      return <CustomerForm isManager={isManager} customer={customer} />
    } else {
      return <CustomerForm isManager={isManager} />
    }
  } catch (error) {
    if (error instanceof Error) {
      Sentry.captureException(error)
      throw error
    }

  }
}
