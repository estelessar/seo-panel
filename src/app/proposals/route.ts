import { NextResponse } from "next/server";

// Mock data for proposals
const proposals = [
  {
    id: "PRO-2024-001",
    customerName: "ABC Şirketi",
    createdAt: "2024-02-01",
    status: "approved",
    amount: 15000,
  },
  {
    id: "PRO-2024-002",
    customerName: "XYZ Limited",
    createdAt: "2024-02-05",
    status: "pending",
    amount: 25000,
  },
  {
    id: "PRO-2024-003",
    customerName: "123 Teknoloji",
    createdAt: "2024-02-08",
    status: "rejected",
    amount: 18000,
  },
];

export async function GET() {
  return NextResponse.json(proposals);
}
