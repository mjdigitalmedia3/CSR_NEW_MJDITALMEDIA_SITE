import { z } from "zod";

export const projectTypes = [
  "E-commerce",
  "Portfolio",
  "Blog",
  "Corporate",
  "Landing Page",
  "Web Application",
  "Other"
] as const;

export const budgetRanges = [
  "Under $1,000",
  "$1,000 - $5,000",
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000+"
] as const;

export const timelineOptions = [
  "ASAP",
  "1-2 weeks",
  "1 month",
  "2-3 months",
  "Flexible"
] as const;

export const featureOptions = [
  "Responsive Design",
  "E-commerce",
  "CMS",
  "Blog",
  "Contact Forms",
  "SEO Optimization",
  "Social Media Integration",
  "Analytics",
  "Custom Animations",
  "User Authentication",
  "Payment Processing",
  "API Integration"
] as const;

export const statusOptions = [
  "New",
  "Contacted",
  "In Progress",
  "Converted",
  "Archived"
] as const;

export const insertClientSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  company: z.string().optional(),
  projectType: z.enum(projectTypes),
  budgetRange: z.enum(budgetRanges),
  timeline: z.enum(timelineOptions),
  features: z.array(z.string()).min(1, "Please select at least one feature"),
  requirements: z.string().optional(),
  status: z.enum(statusOptions).optional(),
});

export type InsertClient = z.infer<typeof insertClientSchema>;
