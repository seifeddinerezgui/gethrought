import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model (already defined)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Solutions model
export const solutions = pgTable("solutions", {
  id: serial("id").primaryKey(),
  order: integer("order").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  link: text("link").notNull(),
});

// International locations model
export const locations = pgTable("locations", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  postalCode: text("postal_code").notNull(),
  country: text("country").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  latitude: varchar("latitude", { length: 20 }),
  longitude: varchar("longitude", { length: 20 }),
});

// Jobs model
export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  location: text("location").notNull(),
  contractType: text("contract_type").notNull(),
  description: text("description").notNull(),
  isActive: boolean("is_active").notNull().default(true),
});

// News model
export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url").notNull(),
  publishDate: timestamp("publish_date").notNull(),
  category: text("category").notNull(),
});

// Contact form submissions model
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  acceptTerms: boolean("accept_terms").notNull(),
});

// Newsletter subscriptions model
export const newsletters = pgTable("newsletters", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Schema validation for inserts
export const insertSolutionSchema = createInsertSchema(solutions);
export const insertLocationSchema = createInsertSchema(locations);
export const insertJobSchema = createInsertSchema(jobs);
export const insertNewsSchema = createInsertSchema(news);

export const insertContactSchema = createInsertSchema(contacts).pick({
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  company: true,
  message: true,
  acceptTerms: true,
});

export const insertNewsletterSchema = createInsertSchema(newsletters).pick({
  email: true,
});

// Define types for inserts and selects
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertSolution = z.infer<typeof insertSolutionSchema>;
export type Solution = typeof solutions.$inferSelect;

export type InsertLocation = z.infer<typeof insertLocationSchema>;
export type Location = typeof locations.$inferSelect;

export type InsertJob = z.infer<typeof insertJobSchema>;
export type Job = typeof jobs.$inferSelect;

export type InsertNews = z.infer<typeof insertNewsSchema>;
export type News = typeof news.$inferSelect;

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
export type Newsletter = typeof newsletters.$inferSelect;
