import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Customer, SEOService } from "@/types/crm";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

const seoServices: SEOService[] = [
  {
    id: "1",
    name: "Temel SEO Paketi",
    description: "Temel SEO optimizasyonu ve raporlama",
    price: 1000,
    currency: "TRY",
    duration: "1 ay",
    features: [
      "Anahtar Kelime Araştırması",
      "On-Page SEO Optimizasyonu",
      "Aylık Raporlama",
    ],
  },
  {
    id: "2",
    name: "Gelişmiş SEO Paketi",
    description: "Kapsamlı SEO stratejisi ve içerik optimizasyonu",
    price: 2500,
    currency: "TRY",
    duration: "1 ay",
    features: [
      "Temel Paket Özellikleri",
      "İçerik Stratejisi",
      "Teknik SEO Analizi",
      "Rakip Analizi",
    ],
  },
];

interface ProposalFormProps {
  customers: Customer[];
  onSubmit: (data: any) => void;
}

export function ProposalForm({ customers, onSubmit }: ProposalFormProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    customerId: "",
    serviceId: "",
    validUntil: new Date(),
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setOpen(false);
  };

  const selectedService = seoServices.find((s) => s.id === formData.serviceId);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Yeni Teklif Oluştur</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Yeni Teklif</DialogTitle>
          <DialogDescription>
            Müşteri ve hizmet bilgilerini girerek yeni bir teklif oluşturun.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customer" className="text-right">
                Müşteri
              </Label>
              <Select
                value={formData.customerId}
                onValueChange={(value) =>
                  setFormData({ ...formData, customerId: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Müşteri seçin" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="service" className="text-right">
                Hizmet
              </Label>
              <Select
                value={formData.serviceId}
                onValueChange={(value) =>
                  setFormData({ ...formData, serviceId: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Hizmet seçin" />
                </SelectTrigger>
                <SelectContent>
                  {seoServices.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name} - {service.price} {service.currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="validUntil" className="text-right">
                Geçerlilik
              </Label>
              <div className="col-span-3">
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  type="button"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(formData.validUntil, "PPP", { locale: tr })}
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Açıklama
              </Label>
              <Textarea
                id="description"
                className="col-span-3"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Teklif Oluştur</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
