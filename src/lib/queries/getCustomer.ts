import { db } from '@/db'
import { customers } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function getCustomer(id: number) {
  const customer = await db.select()
    .from(customers)
    .where(eq(customers.id, id))

  return customer[0]
}

/* Note:
 * The function executes a db query to fetch customer data
 * from the customers table.
 * It retrieves a single customer record by ID returning
 * the first and presumambly only matching record from the 
 * customers table.
 */
