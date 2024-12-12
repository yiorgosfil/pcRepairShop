import CustomerSearch from "./CustomerSearch"
import CustomerTable from "./CustomerTable"
import { getCustomerSearchResults } from '@/lib/queries/getCustomerSearchResults'
import * as Sentry from '@sentry/nextjs'

export const metadata = {
  title: "Customer Search"
}

export default async function Customers({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const { searchText } = await searchParams
  if (!searchText) return <CustomerSearch />

  const span = Sentry.startInactiveSpan({
    name: 'getCustomerSearchResults-1'
  })
  const results = await getCustomerSearchResults(searchText)
  span.end()

  return (
    <>
      <CustomerSearch />
      {results.length
        ? <CustomerTable data={results} />
        : <p className='mt-4'>No results found</p>
      }
    </>
  )

}

