import {
  users,
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

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private solutions: Map<number, Solution>;
  private locations: Map<number, Location>;
  private jobs: Map<number, Job>;
  private news: Map<number, News>;
  private contacts: Map<number, Contact>;
  private newsletters: Map<number, Newsletter>;
  private jobApplications: Map<number, JobApplication>;
  
  private currentUserId: number;
  private currentSolutionId: number;
  private currentLocationId: number;
  private currentJobId: number;
  private currentNewsId: number;
  private currentContactId: number;
  private currentNewsletterId: number;
  private currentJobApplicationId: number;

  constructor() {
    this.users = new Map();
    this.solutions = new Map();
    this.locations = new Map();
    this.jobs = new Map();
    this.news = new Map();
    this.contacts = new Map();
    this.newsletters = new Map();

    this.currentUserId = 1;
    this.currentSolutionId = 1;
    this.currentLocationId = 1;
    this.currentJobId = 1;
    this.currentNewsId = 1;
    this.currentContactId = 1;
    this.currentNewsletterId = 1;

    // Initialize with sample data
    this.initSampleData();
  }

  // User methods (already defined)
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Solutions methods
  async getSolutions(): Promise<Solution[]> {
    return Array.from(this.solutions.values()).sort((a, b) => a.order - b.order);
  }

  async getSolution(id: number): Promise<Solution | undefined> {
    return this.solutions.get(id);
  }

  async createSolution(insertSolution: InsertSolution): Promise<Solution> {
    const id = this.currentSolutionId++;
    const solution: Solution = { ...insertSolution, id };
    this.solutions.set(id, solution);
    return solution;
  }

  // Locations methods
  async getLocations(): Promise<Location[]> {
    return Array.from(this.locations.values());
  }

  async getLocation(id: number): Promise<Location | undefined> {
    return this.locations.get(id);
  }

  async createLocation(insertLocation: InsertLocation): Promise<Location> {
    const id = this.currentLocationId++;
    const location: Location = { ...insertLocation, id };
    this.locations.set(id, location);
    return location;
  }

  // Jobs methods
  async getJobs(): Promise<Job[]> {
    return Array.from(this.jobs.values()).filter(job => job.isActive);
  }

  async getJob(id: number): Promise<Job | undefined> {
    return this.jobs.get(id);
  }

  async createJob(insertJob: InsertJob): Promise<Job> {
    const id = this.currentJobId++;
    const job: Job = { ...insertJob, id };
    this.jobs.set(id, job);
    return job;
  }

  // News methods
  async getAllNews(): Promise<News[]> {
    return Array.from(this.news.values()).sort((a, b) => 
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
  }

  async getNews(page: number, limit: number): Promise<{ news: News[], total: number }> {
    const allNews = await this.getAllNews();
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    return {
      news: allNews.slice(startIndex, endIndex),
      total: allNews.length
    };
  }

  async getNewsByCategory(category: string, page: number, limit: number): Promise<{ news: News[], total: number }> {
    const allNewsInCategory = (await this.getAllNews())
      .filter(newsItem => newsItem.category === category);
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    return {
      news: allNewsInCategory.slice(startIndex, endIndex),
      total: allNewsInCategory.length
    };
  }

  async getNewsItem(id: number): Promise<News | undefined> {
    return this.news.get(id);
  }

  async createNews(insertNews: InsertNews): Promise<News> {
    const id = this.currentNewsId++;
    const newsItem: News = { ...insertNews, id };
    this.news.set(id, newsItem);
    return newsItem;
  }

  // Contact form submissions
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date() 
    };
    this.contacts.set(id, contact);
    return contact;
  }

  // Newsletter subscriptions
  async createNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    // Check if email already exists
    const existingEmail = Array.from(this.newsletters.values()).find(
      (newsletter) => newsletter.email === insertNewsletter.email
    );
    
    if (existingEmail) {
      return existingEmail;
    }
    
    const id = this.currentNewsletterId++;
    const newsletter: Newsletter = { 
      ...insertNewsletter, 
      id, 
      createdAt: new Date() 
    };
    this.newsletters.set(id, newsletter);
    return newsletter;
  }

  // Initialize with sample data
  private initSampleData() {
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
    
    solutionData.forEach(solution => {
      this.createSolution(solution);
    });

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

    locationData.forEach(location => {
      this.createLocation(location);
    });

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

    jobData.forEach(job => {
      this.createJob(job);
    });

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

    newsData.forEach(newsItem => {
      this.createNews(newsItem);
    });
  }
}

export const storage = new MemStorage();
