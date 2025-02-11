import { NextResponse } from "next/server";

// Mock data for customers
const customers = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    company: "ABC Teknoloji Ltd. Şti.",
    email: "ahmet@abctech.com",
    phone: "0555 111 2233",
    lastProposal: {
      date: "2024-02-01",
      status: "approved",
    },
    totalProposals: 5,
    paidAmount: 25000,
    pendingAmount: 5000,
  },
  {
    id: 2,
    name: "Ayşe Kara",
    company: "XYZ Yazılım A.Ş.",
    email: "ayse@xyzyazilim.com",
    phone: "0533 444 5566",
    lastProposal: {
      date: "2024-02-05",
      status: "pending",
    },
    totalProposals: 3,
    paidAmount: 15000,
    pendingAmount: 10000,
  },
  {
    id: 3,
    name: "Mehmet Demir",
    company: "123 Digital",
    email: "mehmet@123digital.com",
    phone: "0532 777 8899",
    lastProposal: {
      date: "2024-02-08",
      status: "rejected",
    },
    totalProposals: 2,
    paidAmount: 8000,
    pendingAmount: 0,
  },
];

export async function GET() {
  return NextResponse.json(customers);
}

export async function POST(request: Request) {
  const body = await request.json();
  
  // In a real application, validate and save to database
  const newCustomer = {
    id: customers.length + 1,
    ...body,
    lastProposal: null,
    totalProposals: 0,
    paidAmount: 0,
    pendingAmount: 0,
  };
  
  customers.push(newCustomer);
  
  return NextResponse.json(newCustomer);
}
