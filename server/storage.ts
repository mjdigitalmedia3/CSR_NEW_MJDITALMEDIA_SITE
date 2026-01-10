import { clients, type Client, type InsertClient, type User, type InsertUser, users, portfolioProjects, type PortfolioProject, type InsertPortfolioProject } from "@shared/schema";
import { db } from "./db";
import { eq, desc, asc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getClients(): Promise<Client[]>;
  getClient(id: string): Promise<Client | undefined>;
  createClient(client: InsertClient): Promise<Client>;
  updateClient(id: string, updates: Partial<InsertClient>): Promise<Client | undefined>;
  deleteClient(id: string): Promise<boolean>;
  getStats(): Promise<{
    totalLeads: number;
    newThisWeek: number;
    inProgress: number;
    converted: number;
  }>;
  
  getPortfolioProjects(): Promise<PortfolioProject[]>;
  getVisiblePortfolioProjects(): Promise<PortfolioProject[]>;
  getPortfolioProject(id: string): Promise<PortfolioProject | undefined>;
  createPortfolioProject(project: InsertPortfolioProject): Promise<PortfolioProject>;
  updatePortfolioProject(id: string, updates: Partial<InsertPortfolioProject>): Promise<PortfolioProject | undefined>;
  deletePortfolioProject(id: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getClients(): Promise<Client[]> {
    return await db.select().from(clients).orderBy(desc(clients.createdAt));
  }

  async getClient(id: string): Promise<Client | undefined> {
    const [client] = await db.select().from(clients).where(eq(clients.id, id));
    return client || undefined;
  }

  async createClient(client: InsertClient): Promise<Client> {
    const [newClient] = await db.insert(clients).values(client).returning();
    return newClient;
  }

  async updateClient(id: string, updates: Partial<InsertClient>): Promise<Client | undefined> {
    const [updatedClient] = await db
      .update(clients)
      .set(updates)
      .where(eq(clients.id, id))
      .returning();
    return updatedClient || undefined;
  }

  async deleteClient(id: string): Promise<boolean> {
    const result = await db.delete(clients).where(eq(clients.id, id)).returning();
    return result.length > 0;
  }

  async getStats(): Promise<{
    totalLeads: number;
    newThisWeek: number;
    inProgress: number;
    converted: number;
  }> {
    const allClients = await db.select().from(clients);
    
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const totalLeads = allClients.length;
    const newThisWeek = allClients.filter(
      (c) => new Date(c.createdAt) >= oneWeekAgo
    ).length;
    const inProgress = allClients.filter((c) => c.status === "In Progress").length;
    const converted = allClients.filter((c) => c.status === "Converted").length;

    return { totalLeads, newThisWeek, inProgress, converted };
  }

  async getPortfolioProjects(): Promise<PortfolioProject[]> {
    return await db.select().from(portfolioProjects).orderBy(asc(portfolioProjects.displayOrder), desc(portfolioProjects.createdAt));
  }

  async getVisiblePortfolioProjects(): Promise<PortfolioProject[]> {
    return await db.select().from(portfolioProjects).where(eq(portfolioProjects.isVisible, true)).orderBy(asc(portfolioProjects.displayOrder), desc(portfolioProjects.createdAt));
  }

  async getPortfolioProject(id: string): Promise<PortfolioProject | undefined> {
    const [project] = await db.select().from(portfolioProjects).where(eq(portfolioProjects.id, id));
    return project || undefined;
  }

  async createPortfolioProject(project: InsertPortfolioProject): Promise<PortfolioProject> {
    const [newProject] = await db.insert(portfolioProjects).values(project).returning();
    return newProject;
  }

  async updatePortfolioProject(id: string, updates: Partial<InsertPortfolioProject>): Promise<PortfolioProject | undefined> {
    const [updatedProject] = await db
      .update(portfolioProjects)
      .set(updates)
      .where(eq(portfolioProjects.id, id))
      .returning();
    return updatedProject || undefined;
  }

  async deletePortfolioProject(id: string): Promise<boolean> {
    const result = await db.delete(portfolioProjects).where(eq(portfolioProjects.id, id)).returning();
    return result.length > 0;
  }
}

export const storage = new DatabaseStorage();
