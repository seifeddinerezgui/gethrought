import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { fadeIn, fadeInUp } from "@/lib/animations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Job } from "@shared/schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Form schema
const formSchema = z.object({
  firstName: z.string().min(2, { message: "Le prénom est requis" }),
  lastName: z.string().min(2, { message: "Le nom est requis" }),
  email: z.string().email({ message: "Email invalide" }),
  phone: z.string().optional(),
  resumeUrl: z.string().min(5, { message: "Veuillez fournir un lien vers votre CV" }),
  coverLetter: z.string().optional(),
  linkedinUrl: z.string().optional(),
  acceptTerms: z.boolean().refine((value) => value === true, {
    message: "Vous devez accepter les conditions",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const JobApplication = () => {
  const { id } = useParams<{ id: string }>();
  const jobId = parseInt(id);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fetch job details
  const { data: job, isLoading: isJobLoading } = useQuery<Job>({
    queryKey: ["/api/jobs", jobId],
    queryFn: async () => {
      const res = await fetch(`/api/jobs/${jobId}`);
      if (!res.ok) {
        throw new Error("Failed to fetch job");
      }
      return res.json();
    },
  });

  // Form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      resumeUrl: "",
      coverLetter: "",
      linkedinUrl: "",
      acceptTerms: false,
    },
  });

  // Redirect if job not found after loading
  useEffect(() => {
    if (!isJobLoading && !job) {
      toast({
        title: "Offre d'emploi introuvable",
        description: "Cette offre d'emploi n'existe pas ou a été supprimée.",
        variant: "destructive",
      });
      setLocation("/nous-rejoindre");
    }
  }, [isJobLoading, job, setLocation, toast]);

  // Form submission
  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      
      // Form submission is static (no email sent)
      // In a production environment, we would use something like:
      // await apiRequest(`/api/jobs/${jobId}/apply`, {
      //   method: "POST",
      //   body: JSON.stringify(data),
      // });

      // Instead, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      toast({
        title: "Candidature envoyée",
        description: "Votre candidature a été enregistrée avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre candidature. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isJobLoading) {
    return (
      <div className="py-20 container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-3/4 mb-8"></div>
            <div className="h-6 bg-gray-200 rounded w-full mb-6"></div>
            <div className="h-6 bg-gray-200 rounded w-2/3 mb-12"></div>
            
            <div className="space-y-6">
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return null; // Will redirect via useEffect
  }

  if (isSubmitted) {
    return (
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="py-20 container mx-auto px-4"
      >
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-md">
          <motion.div 
            variants={fadeInUp}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <path d="M20 6 9 17l-5-5"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Candidature envoyée avec succès</h2>
            <p className="text-gray-600 mb-8">
              Nous avons bien reçu votre candidature pour le poste de {job.title}. 
              Notre équipe va l'examiner et vous recontactera dans les plus brefs délais.
            </p>
            <Button 
              onClick={() => setLocation("/nous-rejoindre")}
              className="bg-[#c4121f] hover:bg-[#a50f1a]"
            >
              Retour aux offres d'emploi
            </Button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="py-20 container mx-auto px-4"
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Postuler pour: {job.title}</h1>
        <p className="text-gray-600 mb-8">
          Lieu: {job.location} | Type de contrat: {job.contractType}
        </p>

        <div className="bg-white p-8 rounded-xl shadow-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom *</FormLabel>
                      <FormControl>
                        <Input placeholder="Votre prénom" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom *</FormLabel>
                      <FormControl>
                        <Input placeholder="Votre nom" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Votre email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Téléphone</FormLabel>
                      <FormControl>
                        <Input placeholder="Votre numéro de téléphone" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="resumeUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lien vers votre CV *</FormLabel>
                    <FormControl>
                      <Input placeholder="URL de votre CV (Google Drive, Dropbox, etc.)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="coverLetter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lettre de motivation</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Votre lettre de motivation"
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="linkedinUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profil LinkedIn</FormLabel>
                    <FormControl>
                      <Input placeholder="URL de votre profil LinkedIn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        J'accepte que mes données soient utilisées dans le cadre de ma candidature *
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#c4121f] hover:bg-[#a50f1a]"
              >
                {isSubmitting ? "Envoi en cours..." : "Envoyer ma candidature"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </motion.div>
  );
};

export default JobApplication;