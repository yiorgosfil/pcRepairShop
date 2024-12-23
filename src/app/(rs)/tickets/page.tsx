import TicketSearch from "./TicketSearch"
import { getOpenTickets } from '@/lib/queries/getOpenTickets'
import { getTicketSearchResults } from "@/lib/queries/getTicketSearchResults"
import TicketTable from "./TicketTable"

export const metadata = {
  title: "Ticket Search"
}

export default async function Tickets({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const { searchText } = await searchParams
  if (!searchText) {
    const results = await getOpenTickets()
    return (
      <>
        <TicketSearch />
        {results.length ? <TicketTable data={results} />
          : <p className='mt-4'>Geen open tickets gevonden</p>
        }
      </>
    )
  }

  const results = await getTicketSearchResults(searchText)

  return (
    <>
      <TicketSearch />
      {results.length ? <TicketTable data={results} />
        : <p className='mt-4'>Geen resultaten gevonden</p>
      }
    </>
  )
}


