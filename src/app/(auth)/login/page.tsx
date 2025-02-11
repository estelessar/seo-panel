"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "E-posta adresi gerekli" })
    .email("Geçerli bir e-posta adresi girin"),
  password: z
    .string()
    .min(6, { message: "Parola en az 6 karakter olmalıdır" }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    
    try {
      const success = await login(data.email, data.password);
      
      if (success) {
        toast.success("Giriş başarılı", {
          description: "Yönlendiriliyorsunuz...",
        });
        
        setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 1000);
      } else {
        toast.error("Giriş başarısız", {
          description: "E-posta veya parola hatalı",
        });
      }
    } catch (error) {
      toast.error("Bir hata oluştu", {
        description: "Lütfen daha sonra tekrar deneyin",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sol taraf - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Hoş Geldiniz 👋
            </h1>
            <p className="text-muted-foreground">
              Admin paneline erişmek için giriş yapın
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-posta</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="ornek@email.com"
                          className="pl-9"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parola</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="password"
                          placeholder="••••••"
                          className="pl-9"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Giriş yapılıyor...
                  </>
                ) : (
                  <>
                    Giriş Yap
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </Form>

          <div className="text-sm text-center text-muted-foreground">
            <p>Demo hesap bilgileri:</p>
            <p>E-posta: admin@alessar.com</p>
            <p>Parola: 123456</p>
          </div>
        </div>
      </div>

      {/* Sağ taraf - Pazarlama */}
      <div className="hidden lg:flex flex-1 bg-muted">
        <div className="w-full max-w-2xl mx-auto p-12 flex flex-col justify-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold tracking-tight">
              SEO ve Dijital Pazarlama Yönetim Paneli
            </h2>
            <p className="text-xl text-muted-foreground">
              Tüm dijital varlıklarınızı tek bir yerden yönetin. SEO performansınızı
              artırın, sosyal medya hesaplarınızı kontrol edin ve müşterilerinizle
              olan ilişkilerinizi güçlendirin.
            </p>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                SEO analizi ve raporlama
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                Sosyal medya yönetimi
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                İçerik yönetimi ve analizi
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                Müşteri ilişkileri yönetimi
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                Detaylı analitik raporlar
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
