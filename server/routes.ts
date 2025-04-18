import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertNewsletterSchema, insertJobApplicationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  // Get all solutions
  app.get("/api/solutions", async (req, res) => {
    try {
      const solutions = await storage.getSolutions();
      res.json(solutions);
    } catch (error) {
      console.error("Error fetching solutions:", error);
      res.status(500).json({ message: "Failed to fetch solutions" });
    }
  });

  // Get a specific solution by ID
  app.get("/api/solutions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid solution ID" });
      }

      const solution = await storage.getSolution(id);
      if (!solution) {
        return res.status(404).json({ message: "Solution not found" });
      }

      res.json(solution);
    } catch (error) {
      console.error("Error fetching solution:", error);
      res.status(500).json({ message: "Failed to fetch solution" });
    }
  });

  // Get all international locations
  app.get("/api/international", async (req, res) => {
    try {
      const locations = await storage.getLocations();
      res.json(locations);
    } catch (error) {
      console.error("Error fetching locations:", error);
      res.status(500).json({ message: "Failed to fetch locations" });
    }
  });

  // Get job listings
  app.get("/api/jobs", async (req, res) => {
    try {
      const jobs = await storage.getJobs();
      res.json(jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      res.status(500).json({ message: "Failed to fetch jobs" });
    }
  });

  // Get a specific job by ID
  app.get("/api/jobs/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid job ID" });
      }

      const job = await storage.getJob(id);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      res.json(job);
    } catch (error) {
      console.error("Error fetching job:", error);
      res.status(500).json({ message: "Failed to fetch job" });
    }
  });

  // Get news articles with pagination
  app.get("/api/news", async (req, res) => {
    try {
      const pageQueryParam = req.query.page;
      const limitQueryParam = req.query.limit;
      const categoryQueryParam = req.query.category as string | undefined;
      
      const page = pageQueryParam ? parseInt(pageQueryParam as string) : 1;
      const limit = limitQueryParam ? parseInt(limitQueryParam as string) : 6;
      
      if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
        return res.status(400).json({ message: "Invalid pagination parameters" });
      }

      let result;
      if (categoryQueryParam) {
        result = await storage.getNewsByCategory(categoryQueryParam, page, limit);
      } else {
        result = await storage.getNews(page, limit);
      }

      res.json({
        items: result.news,
        total: result.total,
        page,
        limit,
        totalPages: Math.ceil(result.total / limit)
      });
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ message: "Failed to fetch news" });
    }
  });

  // Get a specific news article by ID
  app.get("/api/news/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid news ID" });
      }

      const newsItem = await storage.getNewsItem(id);
      if (!newsItem) {
        return res.status(404).json({ message: "News article not found" });
      }

      res.json(newsItem);
    } catch (error) {
      console.error("Error fetching news article:", error);
      res.status(500).json({ message: "Failed to fetch news article" });
    }
  });

  // Submit contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const validationResult = insertContactSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid form data", 
          errors: validationResult.error.errors 
        });
      }

      const contact = await storage.createContact(validationResult.data);
      res.status(201).json({ message: "Form submitted successfully", contactId: contact.id });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  // Subscribe to newsletter
  app.post("/api/newsletter", async (req, res) => {
    try {
      const validationResult = insertNewsletterSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid email address", 
          errors: validationResult.error.errors 
        });
      }

      const newsletter = await storage.createNewsletter(validationResult.data);
      res.status(201).json({ message: "Subscribed to newsletter successfully" });
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });

  // Submit job application
  app.post("/api/jobs/:jobId/apply", async (req, res) => {
    try {
      const jobId = parseInt(req.params.jobId);
      if (isNaN(jobId)) {
        return res.status(400).json({ message: "Invalid job ID" });
      }

      // Check if job exists
      const job = await storage.getJob(jobId);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      // Validate application data
      const applicationData = { ...req.body, jobId };
      const validationResult = insertJobApplicationSchema.safeParse(applicationData);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid application data", 
          errors: validationResult.error.errors 
        });
      }

      // Store the application
      const application = await storage.createJobApplication(validationResult.data);
      
      // Send email notification (placeholder - will be implemented with SendGrid)
      // TODO: Implement email notification with SendGrid API
      
      res.status(201).json({ 
        message: "Application submitted successfully", 
        applicationId: application.id 
      });
    } catch (error) {
      console.error("Error submitting job application:", error);
      res.status(500).json({ message: "Failed to submit job application" });
    }
  });

  // Get job applications for a specific job (protected endpoint for admins)
  app.get("/api/jobs/:jobId/applications", async (req, res) => {
    try {
      const jobId = parseInt(req.params.jobId);
      if (isNaN(jobId)) {
        return res.status(400).json({ message: "Invalid job ID" });
      }

      // Check if job exists
      const job = await storage.getJob(jobId);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      // TODO: Add authentication to protect this endpoint

      const applications = await storage.getJobApplicationsByJobId(jobId);
      res.json(applications);
    } catch (error) {
      console.error("Error fetching job applications:", error);
      res.status(500).json({ message: "Failed to fetch job applications" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
