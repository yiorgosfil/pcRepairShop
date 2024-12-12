import { db } from '@/db'
import { customers } from '@/db/schema'
import { ilike, or, sql } from 'drizzle-orm'

export async function getCustomerSearchResults(searchText: string) {
  const results = await db.select()
    .from(customers)
    .where(or(
      // ilike(customers.firstName, `%${searchText}%`),
      // ilike(customers.lastName, `%${searchText}%`),
      ilike(customers.email, `%${searchText}%`),
      ilike(customers.phone, `%${searchText}%`),
      sql`lower(concat(${customers.firstName}, ' ', ${customers.lastName})) LIKE ${`%${searchText.toLowerCase().replace(' ', '%')}%`}`
    ))
  return results
}
