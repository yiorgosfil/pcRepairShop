import { getCustomer } from "@/lib/queries/getCustomer";
import { getTicket } from "@/lib/queries/getTickets";
import { BackButton } from "@/components/BackButton";
import * as Sentry from '@sentry/nextjs'
import TicketForm from '@/app/(rs)/tickets/form/TicketForm'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Users, init as kindeInit } from '@kinde/management-api-js'

// Custom type 
type SearchParams = Promise<{ [key: string]: string | undefined }>

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const { customerId, ticketId } = await searchParams

  if (!customerId && !ticketId) return {
    title: 'TicketID of CustomerID ontbreekt'
  }
  if (customerId) return {
    title: `Nieuwe Ticket voor Klant #${customerId}`
  }
  if (ticketId) return {
    title: `Ticket Bewerken #${ticketId}`
  }
}

export default async function TicketFormPage({ searchParams }: { searchParams: SearchParams }) {
  try {
    const { customerId, ticketId } = await searchParams

    if (!customerId && !ticketId) {
      return (
        <>
          <h2 className="text-2xl mb-2">
            Ticket-ID of Klant-ID is vereist om het ticketformulier te laden.
          </h2>
          <BackButton title="Terug" variant="default" />
        </>
      )
    }

    const { getPermission, getUser } = getKindeServerSession()
    const [managerPermission, user] = await Promise.all([
      getPermission('manager'),
      getUser(),
    ])
    const isManager = managerPermission?.isGranted

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
      if (isManager) {
        // Initialize the kinde managementAPI
        kindeInit()
        const { users } = await Users.getUsers()

        const techs = users ? users.map(user => (
          { id: user.email!, description: user.email! }
        )) : []

        return <TicketForm customer={customer} techs={techs} />
      } else {
        return <TicketForm customer={customer} />
      }
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

      if (isManager) {
        // Initialize the kinde managementAPI
        kindeInit()
        const { users } = await Users.getUsers()

        const techs = users ? users.map(user => (
          { id: user.email!, description: user.email! }
        )) : []

        return <TicketForm customer={customer} ticket={ticket} techs={techs} />
      } else {
        const isEditable = user.email?.toLowerCase() === ticket.tech.toLowerCase()
        return <TicketForm customer={customer} ticket={ticket} isEditable={isEditable} />
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      Sentry.captureException(error)
      throw error
    }
  }

}
