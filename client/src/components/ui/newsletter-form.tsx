import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertNewsletterSchema } from "@shared/schema";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Extend schema with frontend validation
const newsletterFormSchema = insertNewsletterSchema.extend({
  email: z.string().email("Adresse email invalide")
});

type NewsletterFormValues = z.infer<typeof newsletterFormSchema>;

interface NewsletterFormProps {
  buttonFullWidth?: boolean;
}

const NewsletterForm = ({ buttonFullWidth = false }: NewsletterFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: NewsletterFormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/newsletter", data);
      toast({
        title: "Inscription réussie !",
        description: "Vous êtes maintenant inscrit à notre newsletter.",
        variant: "success",
      });
      reset();
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type="email"
          placeholder="Votre adresse email"
          className={`w-full px-4 py-2 rounded bg-white bg-opacity-10 border ${
            errors.email ? "border-red-300" : "border-white border-opacity-20"
          } text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30`}
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-300">{errors.email.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`${
          buttonFullWidth ? "w-full" : ""
        } bg-[#E00000] hover:bg-[#c00000] text-white py-2 px-4 rounded transition-all duration-300 transform hover:-translate-y-1 font-medium ${
          isSubmitting ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {isSubmitting ? (
          <>
            <i className="fas fa-circle-notch fa-spin mr-2"></i>
            Inscription...
          </>
        ) : (
          "S'inscrire"
        )}
      </button>
    </form>
  );
};

export default NewsletterForm;
