import TicketSearch from "./TicketSearch"
import { getOpenTickets } from '@/lib/queries/getOpenTickets'
import { getTicketSearchResults } from "@/lib/queries/getTicketSearchResults"

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
        <p>{JSON.stringify(results)}</p>
      </>
    )
  }

  const results = await getTicketSearchResults(searchText)

  return (
    <>
      <TicketSearch />
      <p>{JSON.stringify(results)}</p>
    </>
  )
}


