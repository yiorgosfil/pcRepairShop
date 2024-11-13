import { getCustomer } from "@/lib/queries/getCustomer";
import { getTicket } from "@/lib/queries/getTickets";
import { BackButton } from "@/components/BackButton";
import * as Sentry from '@sentry/nextjs'

// Custom type 
type SearchParams = Promise<{ [key: string]: string | undefined }>

export default async function TicketFormPage({ searchParams }: { searchParams: SearchParams }) {
  try {
    const { customerId, ticketId } = await searchParams

    if (!customerId && !ticketId) {
      return (
        <>
          <h2 className="text-2xl mb-2">
            Ticket ID or Customer ID required to load the ticket form.
          </h2>
          <BackButton title="Go Back" variant="default" />
        </>
      )
    }

    // New ticket form
    if (customerId) {
      const customer = await getCustomer(parseInt(customerId))

      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer ID #{customerId} not found.
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        )
      }
      if (!customer.active) {
        <>
          <h2 className="text-2xl mb-2">
            Customer ID #{customerId} is not active.
          </h2>
          <BackButton title="Go Back" variant="default" />
        </>
      }
      // Return ticket form
      console.log(customer)
    }

    // Edit ticket form
    if (ticketId) {
      const ticket = await getTicket(parseInt(ticketId))

      if (!ticket) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Ticket ID #{ticketId} not found.
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        )
      }

      const customer = await getCustomer(ticket.customerId)

      console.log('ticket: ', ticket)
      console.log('customer: ', customer)

    }
  } catch (error) {
    if (error instanceof Error) {
      Sentry.captureException(error)
      throw error
    }
  }

}
