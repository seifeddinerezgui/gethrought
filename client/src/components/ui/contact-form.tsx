import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Extend the contact schema with frontend validation
const contactFormSchema = insertContactSchema.extend({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, "Votre message doit contenir au moins 10 caractères"),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "Vous devez accepter les conditions" }),
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      message: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/contact", data);
      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons dans les plus brefs délais.",
        variant: "success",
      });
      reset();
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Nom *
          </label>
          <input
            type="text"
            id="lastName"
            className={`w-full px-4 py-2 border ${
              errors.lastName ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-[#E00000] focus:border-[#E00000]`}
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            Prénom *
          </label>
          <input
            type="text"
            id="firstName"
            className={`w-full px-4 py-2 border ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-[#E00000] focus:border-[#E00000]`}
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            className={`w-full px-4 py-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-[#E00000] focus:border-[#E00000]`}
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Téléphone
          </label>
          <input
            type="tel"
            id="phone"
            className={`w-full px-4 py-2 border ${
              errors.phone ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-[#E00000] focus:border-[#E00000]`}
            {...register("phone")}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
          Société
        </label>
        <input
          type="text"
          id="company"
          className={`w-full px-4 py-2 border ${
            errors.company ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-[#E00000] focus:border-[#E00000]`}
          {...register("company")}
        />
        {errors.company && (
          <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message *
        </label>
        <textarea
          id="message"
          rows={5}
          className={`w-full px-4 py-2 border ${
            errors.message ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-[#E00000] focus:border-[#E00000]`}
          {...register("message")}
        ></textarea>
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="acceptTerms"
            type="checkbox"
            className="h-4 w-4 text-[#E00000] border-gray-300 rounded focus:ring-[#E00000]"
            {...register("acceptTerms")}
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="acceptTerms" className="text-gray-600">
            J'accepte que mes données soient traitées dans le cadre de ma demande de contact *
          </label>
          {errors.acceptTerms && (
            <p className="mt-1 text-sm text-red-600">{errors.acceptTerms.message}</p>
          )}
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`inline-block bg-[#E00000] hover:bg-[#c00000] text-white py-3 px-8 rounded transition-all duration-300 transform hover:-translate-y-1 font-medium ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? (
            <>
              <i className="fas fa-circle-notch fa-spin mr-2"></i>
              Envoi en cours...
            </>
          ) : (
            "Envoyer"
          )}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
