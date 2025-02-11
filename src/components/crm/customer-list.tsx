import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Customer, ProposalWithCustomer } from "@/types/crm";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { MoreHorizontal, FileText } from "lucide-react";

interface CustomerListProps {
  customers: Customer[];
  proposals: ProposalWithCustomer[];
  onViewProposals: (customerId: string) => void;
  onEditCustomer: (customer: Customer) => void;
}

export function CustomerList({
  customers,
  proposals,
  onViewProposals,
  onEditCustomer,
}: CustomerListProps) {
  const getCustomerProposals = (customerId: string) => {
    return proposals.filter((proposal) => proposal.customerId === customerId);
  };

  const getLatestProposalStatus = (customerId: string) => {
    const customerProposals = getCustomerProposals(customerId);
    if (customerProposals.length === 0) return null;
    
    const latestProposal = customerProposals.reduce((latest, current) => {
      return new Date(current.createdAt) > new Date(latest.createdAt)
        ? current
        : latest;
    });
    
    return latestProposal.status;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "text-green-600";
      case "rejected":
        return "text-red-600";
      case "sent":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "accepted":
        return "Onaylandı";
      case "rejected":
        return "Reddedildi";
      case "sent":
        return "Gönderildi";
      case "draft":
        return "Taslak";
      default:
        return status;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Müşteri</TableHead>
            <TableHead>E-posta</TableHead>
            <TableHead>Şirket</TableHead>
            <TableHead>Son Teklif Durumu</TableHead>
            <TableHead>Kayıt Tarihi</TableHead>
            <TableHead className="text-right">İşlemler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => {
            const latestStatus = getLatestProposalStatus(customer.id);
            return (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.company || "-"}</TableCell>
                <TableCell>
                  {latestStatus ? (
                    <span className={getStatusColor(latestStatus)}>
                      {getStatusText(latestStatus)}
                    </span>
                  ) : (
                    "Teklif yok"
                  )}
                </TableCell>
                <TableCell>
                  {format(new Date(customer.createdAt), "d MMMM yyyy", {
                    locale: tr,
                  })}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Menüyü aç</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => onViewProposals(customer.id)}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Teklifleri Görüntüle
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onEditCustomer(customer)}
                      >
                        Düzenle
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
