import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { customers } from '@/db/schema'

/* Note:
// Validation schemas for inserting and selecting customer data.
// Sets up specific validation rules to ensure that, the data for
// each customer field, meets the required criteria before it is 
// processed or saved in the database.
*/

export const insertCustomerSchema = createInsertSchema(customers, {
  firstName: (schema) => schema.firstName.min(3, "First name is required"),
  lastName: (schema) => schema.lastName.min(3, "Last name is required"),
  address1: (schema) => schema.address1.min(3, "Address is required"),
  city: (schema) => schema.city.min(3, "City is required"),
  province: (schema) => schema.province.length(2, "Province must be 2 characters"),
  email: (schema) => schema.email.email("Invalid email address"),
  zip: (schema) => schema.zip.regex(/^\d{4}[A-Z]{2}$/, "Invalid ZIP code"),
  phone: (schema) => schema.phone.regex(/^(0[1-9]X{7}|06[1-58]X{7})$/, "Invalid phone number"),
})

export const selectCustomerSchema = createSelectSchema(customers)

export type insertCustomerSchemaType = typeof insertCustomerSchema._type
export type selectCustomerSchemaType = typeof selectCustomerSchema._type
