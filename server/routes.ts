import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertClientSchema, statusOptions, insertPortfolioProjectSchema } from "@shared/schema";
import { z } from "zod";
import fs from "fs";
import path from "path";

const updateClientSchema = insertClientSchema.partial().extend({
  status: z.enum(statusOptions).optional(),
});

const updatePortfolioProjectSchema = insertPortfolioProjectSchema.partial();

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Get all clients
  app.get("/api/clients", async (req, res) => {
    try {
      const clients = await storage.getClients();
      res.json(clients);
    } catch (error) {
      console.error("Error fetching clients:", error);
      res.status(500).json({ message: "Failed to fetch clients" });
    }
  });

  // Get single client by ID
  app.get("/api/clients/:id", async (req, res) => {
    try {
      const client = await storage.getClient(req.params.id);
      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }
      res.json(client);
    } catch (error) {
      console.error("Error fetching client:", error);
      res.status(500).json({ message: "Failed to fetch client" });
    }
  });

  // Create new client
  app.post("/api/clients", async (req, res) => {
    try {
      const validatedData = insertClientSchema.parse(req.body);
      const client = await storage.createClient(validatedData);
      res.status(201).json(client);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation failed", 
          errors: error.errors 
        });
      }
      console.error("Error creating client:", error);
      res.status(500).json({ message: "Failed to create client" });
    }
  });

  // Update client
  app.patch("/api/clients/:id", async (req, res) => {
    try {
      const client = await storage.getClient(req.params.id);
      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }

      const validatedData = updateClientSchema.parse(req.body);
      const updatedClient = await storage.updateClient(req.params.id, validatedData);
      res.json(updatedClient);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation failed", 
          errors: error.errors 
        });
      }
      console.error("Error updating client:", error);
      res.status(500).json({ message: "Failed to update client" });
    }
  });

  // Delete client
  app.delete("/api/clients/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteClient(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Client not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting client:", error);
      res.status(500).json({ message: "Failed to delete client" });
    }
  });

  // Get stats
  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  // YouTube videos JSON helpers
  const YOUTUBE_JSON_PATH = path.resolve("data/youtube-videos.json");

  function readYouTubeVideos() {
    if (fs.existsSync(YOUTUBE_JSON_PATH)) {
      return JSON.parse(fs.readFileSync(YOUTUBE_JSON_PATH, "utf-8"));
    }
    return [];
  }

  function writeYouTubeVideos(videos: any[]) {
    fs.writeFileSync(YOUTUBE_JSON_PATH, JSON.stringify(videos, null, 2));
  }

  // Serve visible YouTube videos (public portfolio page)
  app.get("/api/youtube-videos/public", (req, res) => {
    const videos = readYouTubeVideos();
    const visible = videos.filter((v: any) => v.isVisible !== false);
    res.json(visible);
  });

  // Get all YouTube videos (admin - includes hidden)
  app.get("/api/youtube-videos", (req, res) => {
    res.json(readYouTubeVideos());
  });

  // Toggle visibility of a YouTube video
  app.patch("/api/youtube-videos/:id", (req, res) => {
    try {
      const videos = readYouTubeVideos();
      const index = videos.findIndex((v: any) => v.id === req.params.id);
      if (index === -1) {
        return res.status(404).json({ message: "Video not found" });
      }
      const { isVisible } = req.body;
      if (typeof isVisible === "boolean") {
        videos[index].isVisible = isVisible;
      }
      writeYouTubeVideos(videos);
      res.json(videos[index]);
    } catch (error) {
      console.error("Error updating YouTube video:", error);
      res.status(500).json({ message: "Failed to update video" });
    }
  });

  // Portfolio routes
  
  // Get all portfolio projects (admin)
  app.get("/api/portfolio", async (req, res) => {
    try {
      const projects = await storage.getPortfolioProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching portfolio projects:", error);
      res.status(500).json({ message: "Failed to fetch portfolio projects" });
    }
  });

  // Get visible portfolio projects (public)
  app.get("/api/portfolio/public", async (req, res) => {
    try {
      const projects = await storage.getVisiblePortfolioProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching public portfolio:", error);
      res.status(500).json({ message: "Failed to fetch portfolio" });
    }
  });

  // Get single portfolio project
  app.get("/api/portfolio/:id", async (req, res) => {
    try {
      const project = await storage.getPortfolioProject(req.params.id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      console.error("Error fetching portfolio project:", error);
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  // Create portfolio project
  app.post("/api/portfolio", async (req, res) => {
    try {
      const validatedData = insertPortfolioProjectSchema.parse(req.body);
      const project = await storage.createPortfolioProject(validatedData);
      res.status(201).json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation failed", 
          errors: error.errors 
        });
      }
      console.error("Error creating portfolio project:", error);
      res.status(500).json({ message: "Failed to create project" });
    }
  });

  // Update portfolio project
  app.patch("/api/portfolio/:id", async (req, res) => {
    try {
      const project = await storage.getPortfolioProject(req.params.id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      const validatedData = updatePortfolioProjectSchema.parse(req.body);
      const updatedProject = await storage.updatePortfolioProject(req.params.id, validatedData);
      res.json(updatedProject);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation failed", 
          errors: error.errors 
        });
      }
      console.error("Error updating portfolio project:", error);
      res.status(500).json({ message: "Failed to update project" });
    }
  });

  // Delete portfolio project
  app.delete("/api/portfolio/:id", async (req, res) => {
    try {
      const deleted = await storage.deletePortfolioProject(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting portfolio project:", error);
      res.status(500).json({ message: "Failed to delete project" });
    }
  });

  return httpServer;
}
