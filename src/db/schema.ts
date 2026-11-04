import {
  boolean,
  date,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * Yojana Saathi — prototype data store.
 *
 * Every table below records *demo* submissions made through the public website.
 * Personal data is stored only when the visitor ticks the consent box, and the
 * retention notice is documented in /privacy.
 */

export const eligibilityRequests = pgTable("eligibility_requests", {
  id: serial("id").primaryKey(),
  reference: varchar("reference", { length: 16 }).notNull(),
  name: varchar("name", { length: 120 }).notNull(),
  village: varchar("village", { length: 120 }).notNull(),
  ward: varchar("ward", { length: 40 }),
  ageGroup: varchar("age_group", { length: 40 }).notNull(),
  gender: varchar("gender", { length: 24 }),
  occupation: varchar("occupation", { length: 60 }).notNull(),
  incomeBand: varchar("income_band", { length: 40 }).notNull(),
  householdSize: integer("household_size"),
  disability: varchar("disability", { length: 24 }).notNull().default("no"),
  documents: text("documents").array().notNull().default([]),
  interests: text("interests").array().notNull().default([]),
  matches: text("matches").array().notNull().default([]),
  phone: varchar("phone", { length: 20 }),
  preferredLanguage: varchar("preferred_language", { length: 12 }).notNull().default("en"),
  consent: boolean("consent").notNull().default(false),
  status: varchar("status", { length: 24 }).notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const assistanceRequests = pgTable("assistance_requests", {
  id: serial("id").primaryKey(),
  reference: varchar("reference", { length: 16 }).notNull(),
  schemeSlug: varchar("scheme_slug", { length: 80 }).notNull(),
  applicantType: varchar("applicant_type", { length: 24 }).notNull().default("self"),
  name: varchar("name", { length: 120 }).notNull(),
  village: varchar("village", { length: 120 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  documentsReady: varchar("documents_ready", { length: 24 }).notNull().default("partial"),
  notes: text("notes"),
  consent: boolean("consent").notNull().default(false),
  status: varchar("status", { length: 24 }).notNull().default("queued"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const saathiApplications = pgTable("saathi_applications", {
  id: serial("id").primaryKey(),
  reference: varchar("reference", { length: 16 }).notNull(),
  name: varchar("name", { length: 120 }).notNull(),
  age: integer("age").notNull(),
  gender: varchar("gender", { length: 24 }).notNull().default("female"),
  village: varchar("village", { length: 120 }).notNull(),
  ward: varchar("ward", { length: 40 }),
  phone: varchar("phone", { length: 20 }).notNull(),
  education: varchar("education", { length: 40 }).notNull(),
  reading: varchar("reading", { length: 32 }).notNull(),
  hasSmartphone: boolean("has_smartphone").notNull().default(false),
  hasBankAadhaar: boolean("has_bank_aadhaar").notNull().default(false),
  priorWork: varchar("prior_work", { length: 40 }),
  experience: text("experience"),
  hoursPerDay: varchar("hours_per_day", { length: 32 }).notNull(),
  availableFrom: date("available_from"),
  consent: boolean("consent").notNull().default(false),
  status: varchar("status", { length: 24 }).notNull().default("received"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  reference: varchar("reference", { length: 16 }).notNull(),
  category: varchar("category", { length: 32 }).notNull(),
  name: varchar("name", { length: 120 }).notNull(),
  organisation: varchar("organisation", { length: 140 }),
  email: varchar("email", { length: 140 }),
  phone: varchar("phone", { length: 20 }),
  subject: varchar("subject", { length: 200 }),
  message: text("message").notNull(),
  consent: boolean("consent").notNull().default(false),
  status: varchar("status", { length: 24 }).notNull().default("open"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const schemeViews = pgTable("scheme_views", {
  id: serial("id").primaryKey(),
  schemeSlug: varchar("scheme_slug", { length: 80 }).notNull(),
  language: varchar("language", { length: 12 }).notNull().default("en"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
