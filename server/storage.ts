import {
  users,
  solutions,
  locations,
  jobs,
  news,
  contacts,
  newsletters,
  jobApplications,
  type User,
  type InsertUser,
  type Solution,
  type InsertSolution,
  type Location,
  type InsertLocation,
  type Job,
  type InsertJob,
  type News,
  type InsertNews,
  type Contact,
  type InsertContact,
  type Newsletter,
  type InsertNewsletter,
  type JobApplication,
  type InsertJobApplication
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // Users (already defined)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Solutions
  getSolutions(): Promise<Solution[]>;
  getSolution(id: number): Promise<Solution | undefined>;
  createSolution(solution: InsertSolution): Promise<Solution>;

  // Locations
  getLocations(): Promise<Location[]>;
  getLocation(id: number): Promise<Location | undefined>;
  createLocation(location: InsertLocation): Promise<Location>;

  // Jobs
  getJobs(): Promise<Job[]>;
  getJob(id: number): Promise<Job | undefined>;
  createJob(job: InsertJob): Promise<Job>;

  // News
  getAllNews(): Promise<News[]>;
  getNews(page: number, limit: number): Promise<{ news: News[], total: number }>;
  getNewsByCategory(category: string, page: number, limit: number): Promise<{ news: News[], total: number }>;
  getNewsItem(id: number): Promise<News | undefined>;
  createNews(news: InsertNews): Promise<News>;

  // Contacts
  createContact(contact: InsertContact): Promise<Contact>;

  // Newsletters
  createNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  
  // Job Applications
  createJobApplication(application: InsertJobApplication): Promise<JobApplication>;
  getJobApplicationsByJobId(jobId: number): Promise<JobApplication[]>;
}

// Database Storage Implementation
import { db } from "./db";
import { eq, desc, asc, sql } from "drizzle-orm";

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Solutions methods
  async getSolutions(): Promise<Solution[]> {
    return db.select().from(solutions).orderBy(asc(solutions.order));
  }

  async getSolution(id: number): Promise<Solution | undefined> {
    const [solution] = await db.select().from(solutions).where(eq(solutions.id, id));
    return solution || undefined;
  }

  async createSolution(insertSolution: InsertSolution): Promise<Solution> {
    const [solution] = await db
      .insert(solutions)
      .values(insertSolution)
      .returning();
    return solution;
  }

  // Locations methods
  async getLocations(): Promise<Location[]> {
    return db.select().from(locations);
  }

  async getLocation(id: number): Promise<Location | undefined> {
    const [location] = await db.select().from(locations).where(eq(locations.id, id));
    return location || undefined;
  }

  async createLocation(insertLocation: InsertLocation): Promise<Location> {
    const [location] = await db
      .insert(locations)
      .values(insertLocation)
      .returning();
    return location;
  }

  // Jobs methods
  async getJobs(): Promise<Job[]> {
    return db.select().from(jobs).where(eq(jobs.isActive, true));
  }

  async getJob(id: number): Promise<Job | undefined> {
    const [job] = await db.select().from(jobs).where(eq(jobs.id, id));
    return job || undefined;
  }

  async createJob(insertJob: InsertJob): Promise<Job> {
    const [job] = await db
      .insert(jobs)
      .values(insertJob)
      .returning();
    return job;
  }

  // News methods
  async getAllNews(): Promise<News[]> {
    return db.select().from(news).orderBy(desc(news.publishDate));
  }

  async getNews(page: number, limit: number): Promise<{ news: News[], total: number }> {
    const offset = (page - 1) * limit;
    
    const newsItems = await db
      .select()
      .from(news)
      .orderBy(desc(news.publishDate))
      .limit(limit)
      .offset(offset);
    
    const [{ count }] = await db
      .select({ count: sql`count(*)`.mapWith(Number) })
      .from(news);
    
    return {
      news: newsItems,
      total: count
    };
  }

  async getNewsByCategory(category: string, page: number, limit: number): Promise<{ news: News[], total: number }> {
    const offset = (page - 1) * limit;
    
    const newsItems = await db
      .select()
      .from(news)
      .where(eq(news.category, category))
      .orderBy(desc(news.publishDate))
      .limit(limit)
      .offset(offset);
    
    const [{ count }] = await db
      .select({ count: sql`count(*)`.mapWith(Number) })
      .from(news)
      .where(eq(news.category, category));
    
    return {
      news: newsItems,
      total: count
    };
  }

  async getNewsItem(id: number): Promise<News | undefined> {
    const [newsItem] = await db.select().from(news).where(eq(news.id, id));
    return newsItem || undefined;
  }

  async createNews(insertNews: InsertNews): Promise<News> {
    const [newsItem] = await db
      .insert(news)
      .values(insertNews)
      .returning();
    return newsItem;
  }

  // Contact form submissions
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const contactData = {
      ...insertContact,
      createdAt: new Date()
    };
    
    const [contact] = await db
      .insert(contacts)
      .values(contactData)
      .returning();
    return contact;
  }

  // Newsletter subscriptions
  async createNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    // Check if email already exists
    const [existingEmail] = await db
      .select()
      .from(newsletters)
      .where(eq(newsletters.email, insertNewsletter.email));
    
    if (existingEmail) {
      return existingEmail;
    }
    
    const newsletterData = {
      ...insertNewsletter,
      createdAt: new Date()
    };
    
    const [newsletter] = await db
      .insert(newsletters)
      .values(newsletterData)
      .returning();
    return newsletter;
  }
  
  // Job Applications
  async createJobApplication(insertJobApplication: InsertJobApplication): Promise<JobApplication> {
    const applicationData = {
      ...insertJobApplication,
      status: "new",
      createdAt: new Date()
    };
    
    const [application] = await db
      .insert(jobApplications)
      .values(applicationData)
      .returning();
    return application;
  }
  
  async getJobApplicationsByJobId(jobId: number): Promise<JobApplication[]> {
    return db
      .select()
      .from(jobApplications)
      .where(eq(jobApplications.jobId, jobId))
      .orderBy(desc(jobApplications.createdAt));
  }

  // Method to initialize sample data
  async initSampleData() {
    // This method will be called explicitly after database setup
    console.log("Initializing sample data in database...");
    
    // Solutions
    const solutionData: InsertSolution[] = [
      {
        order: 1,
        title: "Audit légal et contractuel",
        description: "Délivrer l'avis ou la certification d'un expert indépendant",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        link: "/solutions/audit-legal-et-contractuel"
      },
      {
        order: 2,
        title: "Conseil financier",
        description: "Supporter les prises de décision stratégiques et financières",
        imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        link: "/solutions/conseil-financier"
      },
      {
        order: 3,
        title: "Conseil et support opérationnels",
        description: "Optimiser et transformer les organisations et les SI",
        imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        link: "/solutions/conseil-et-support-operationnels"
      },
      {
        order: 4,
        title: "Maîtrise des risques et compliance",
        description: "Sécuriser les organisations et les organes de gouvernance",
        imageUrl: "https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        link: "/solutions/maitrise-des-risques-et-compliance"
      }
    ];
    
    for (const solution of solutionData) {
      await this.createSolution(solution);
    }

    // International locations
    const locationData: InsertLocation[] = [
      {
        title: "Paris Île-de-France",
        address: "11, rue de Laborde",
        city: "Paris",
        postalCode: "75008",
        country: "France",
        phone: "+33 (0) 1 40 08 99 50",
        email: "contact@gethrought.com",
        latitude: "48.8746",
        longitude: "2.3220"
      },
      {
        title: "Auvergne-Rhône-Alpes",
        address: "32, rue de la République",
        city: "Lyon",
        postalCode: "69002",
        country: "France",
        phone: "+33 (0) 1 40 08 99 50",
        email: "contact@gethrought.com",
        latitude: "45.7640",
        longitude: "4.8357"
      },
      {
        title: "Sud-Est",
        address: "1165 rue Jean-René Guillibert Gauthier de La Lauzière",
        city: "Aix-en-Provence",
        postalCode: "13290",
        country: "France",
        phone: "+33 (0) 1 40 08 99 50",
        email: "contact@gethrought.com",
        latitude: "43.4764",
        longitude: "5.3871"
      },
      {
        title: "Sud-Ouest",
        address: "2 rue Auber",
        city: "Toulouse",
        postalCode: "31000",
        country: "France",
        phone: "+33 (0) 1 40 08 99 50",
        email: "contact@gethrought.com",
        latitude: "43.6044",
        longitude: "1.4442"
      },
      {
        title: "Ouest",
        address: "28 boulevard du Colombier",
        city: "Rennes",
        postalCode: "35000",
        country: "France",
        phone: "+33 (0) 1 40 08 99 50",
        email: "contact@gethrought.com",
        latitude: "48.1051",
        longitude: "-1.6778"
      },
      {
        title: "Nord-Ouest",
        address: "154, rue Victor Hugo",
        city: "Le Havre",
        postalCode: "76600",
        country: "France",
        phone: "+33 (0) 1 40 08 99 50",
        email: "contact@gethrought.com",
        latitude: "49.4938",
        longitude: "0.1079"
      },
      {
        title: "Royaume-Uni",
        address: "Exmouth House – 3-11 Pine St",
        city: "London",
        postalCode: "EC1R 0JH",
        country: "United Kingdom",
        phone: "+44 (0) 7979 3131 03",
        email: "contact@gethrought.com",
        latitude: "51.5074",
        longitude: "-0.1278"
      },
      {
        title: "Maroc",
        address: "23, rue El Amaraoui Brahim (Ex Nolly)",
        city: "Casablanca",
        postalCode: "",
        country: "Maroc",
        phone: "+212 (0) 5 22 27 63 72",
        email: "contact@gethrought.com",
        latitude: "33.5731",
        longitude: "-7.5898"
      }
    ];

    for (const location of locationData) {
      await this.createLocation(location);
    }

    // Jobs
    const jobData: InsertJob[] = [
      {
        title: "Auditeur Financier Senior H/F",
        location: "Paris",
        contractType: "CDI",
        description: "Vous intégrerez notre équipe d'audit et participerez à des missions variées auprès de clients de différents secteurs. Une expérience de 3 à 5 ans en cabinet d'audit est requise.",
        isActive: true
      },
      {
        title: "Consultant en Transformation Financière H/F",
        location: "Lyon",
        contractType: "CDI",
        description: "En tant que consultant, vous accompagnerez nos clients dans leurs projets de transformation financière et d'optimisation des processus. Minimum 2 ans d'expérience en conseil.",
        isActive: true
      },
      {
        title: "Expert-Comptable H/F",
        location: "Toulouse",
        contractType: "CDI",
        description: "Vous interviendrez sur des missions de conseil, de production comptable et d'établissement des comptes annuels pour une clientèle variée. Diplôme d'expertise comptable exigé.",
        isActive: true
      },
      {
        title: "Auditeur Junior H/F",
        location: "Paris",
        contractType: "CDI",
        description: "Dans le cadre de votre fonction, vous participerez activement aux missions d'audit légal et contractuel auprès de nos clients. Débutant accepté.",
        isActive: true
      },
      {
        title: "Responsable Consolidation H/F",
        location: "Lyon",
        contractType: "CDI",
        description: "Vous prendrez en charge la consolidation des comptes de nos clients grands groupes et la mise en place de processus d'optimisation. 5 ans d'expérience minimum.",
        isActive: true
      }
    ];

    for (const job of jobData) {
      await this.createJob(job);
    }

    // News
    const newsData: InsertNews[] = [
      {
        title: "Risques et ratios des banques : un accès centralisé",
        excerpt: "L'Autorité Bancaire Européenne (ABE) a mis en place un hub centralisé pour faciliter l'accès aux données prudentielles des établissements financiers européens...",
        content: "L'Autorité Bancaire Européenne (ABE) a mis en place un hub centralisé pour faciliter l'accès aux données prudentielles des établissements financiers européens. Cette plateforme permettra aux analystes et aux régulateurs d'accéder plus facilement aux informations sur les risques et les ratios des banques, renforçant ainsi la transparence du secteur bancaire européen.",
        imageUrl: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        publishDate: new Date("2023-04-10"),
        category: "Banque & Assurance"
      },
      {
        title: "La digitalisation du reporting de durabilité toujours au programme !",
        excerpt: "L'EFRAG poursuit ses travaux sur la digitalisation du reporting de durabilité avec la publication d'un document de consultation sur la taxonomie XBRL...",
        content: "L'EFRAG poursuit ses travaux sur la digitalisation du reporting de durabilité avec la publication d'un document de consultation sur la taxonomie XBRL. Cette initiative s'inscrit dans le cadre de la directive CSRD (Corporate Sustainability Reporting Directive) qui vise à standardiser et à digitaliser les rapports de durabilité des entreprises européennes.",
        imageUrl: "https://images.unsplash.com/photo-1618044733300-9472054094ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        publishDate: new Date("2023-04-10"),
        category: "ESG & Développement Durable"
      },
      {
        title: "Dette versus fonds propres : vers un entre-deux...",
        excerpt: "L'IASB a publié un exposé-sondage visant à améliorer les informations fournies par les entreprises sur leurs instruments financiers présentant des caractéristiques à la fois de dette et de capitaux propres...",
        content: "L'IASB a publié un exposé-sondage visant à améliorer les informations fournies par les entreprises sur leurs instruments financiers présentant des caractéristiques à la fois de dette et de capitaux propres. Ces instruments hybrides, de plus en plus utilisés par les entreprises, posent des défis en termes de classification comptable et de transparence pour les investisseurs.",
        imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        publishDate: new Date("2023-04-10"),
        category: "Comptabilité & Normes IFRS"
      },
      {
        title: "Les impacts de la réforme fiscale internationale sur les groupes",
        excerpt: "La mise en place du pilier 2 de la réforme fiscale internationale va impacter significativement les groupes multinationaux. Découvrez les principaux enjeux...",
        content: "La mise en place du pilier 2 de la réforme fiscale internationale, qui prévoit un taux d'imposition minimum de 15% pour les grandes entreprises multinationales, va impacter significativement la stratégie fiscale de ces groupes. Les entreprises devront adapter leur politique de prix de transfert et revoir leurs structures juridiques pour se conformer à ces nouvelles règles.",
        imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        publishDate: new Date("2023-04-05"),
        category: "Fiscalité"
      },
      {
        title: "Nouveau référentiel d'audit : quels changements pour les commissaires aux comptes ?",
        excerpt: "La réforme du référentiel normatif de l'audit apporte des modifications substantielles aux pratiques professionnelles des commissaires aux comptes...",
        content: "La réforme du référentiel normatif de l'audit apporte des modifications substantielles aux pratiques professionnelles des commissaires aux comptes. Les nouvelles normes, qui entreront en vigueur prochainement, visent à renforcer la qualité de l'audit et à harmoniser les pratiques au niveau international. Les cabinets devront adapter leurs méthodologies et former leurs équipes à ces nouvelles exigences.",
        imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        publishDate: new Date("2023-03-20"),
        category: "Audit et Certification"
      },
      {
        title: "Actualisation des règles de consolidation : ce qui change pour les groupes",
        excerpt: "Le Comité de la Réglementation Comptable a publié une mise à jour des règles de consolidation applicables aux comptes consolidés selon les normes françaises...",
        content: "Le Comité de la Réglementation Comptable a publié une mise à jour des règles de consolidation applicables aux comptes consolidés selon les normes françaises. Ces modifications visent à simplifier certaines procédures tout en assurant une meilleure comparabilité avec les normes IFRS. Les groupes établissant leurs comptes selon les normes françaises devront se familiariser avec ces changements pour leur prochaine clôture annuelle.",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        publishDate: new Date("2023-03-15"),
        category: "Comptabilité & Normes IFRS"
      }
    ];

    for (const newsItem of newsData) {
      await this.createNews(newsItem);
    }
    
    console.log("Sample data initialization complete");
  }
}

export const storage = new DatabaseStorage();
