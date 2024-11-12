import { pgTable, serial, varchar, boolean, timestamp, integer, text } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const customers = pgTable("customers", {
  id: serial('id').primaryKey(),
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
  email: varchar("email").unique().notNull(),
  phone: varchar("phone").unique().notNull(),
  address1: varchar("address1").notNull(),
  address2: varchar("address2"),
  city: varchar("city").notNull(),
  province: varchar("province").notNull(),
  zip: varchar("zip", { length: 6 }).notNull(),
  notes: text("notes"),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
})

export const tickets = pgTable("tickets", {
  id: serial('id').primaryKey(),
  customerId: integer("customer_id").notNull().references(() => customers.id),
  title: varchar('title').notNull(),
  description: text('description'),
  completed: boolean('completed').notNull().default(false),
  tech: varchar('tech').notNull().default("unassigned"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
})

// One-to-many relationship between `customers` and `tickets`
// Each customer can have many associated tickets
export const customersRelations = relations(customers,
  ({ many }) => ({
    tickets: many(tickets),
  })
)

// One-to-one relationship between `ticket` and `customer`
// Each ticket has exactly one customer
export const ticketsRelations = relations(tickets,
  ({ one }) => ({
    customer: one(customers, {
      fields: [tickets.customerId],
      references: [customers.id],
    })
  })
)
