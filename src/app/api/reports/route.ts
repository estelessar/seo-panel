import { NextResponse } from "next/server";

// Mock data for reports
const reports = [
  {
    id: 1,
    name: "Site SEO Analizi - example.com",
    customerName: "ABC Teknoloji Ltd. Şti.",
    type: "Genel SEO",
    date: "2024-02-01",
    status: "sent",
    size: 2048576, // 2MB
  },
  {
    id: 2,
    name: "Backlink Raporu - example.com",
    customerName: "XYZ Yazılım A.Ş.",
    type: "Backlink",
    date: "2024-02-05",
    status: "pending",
    size: 1048576, // 1MB
  },
  {
    id: 3,
    name: "Site Hataları Raporu - example.com",
    customerName: "123 Digital",
    type: "Site Hataları",
    date: "2024-02-08",
    status: "error",
    size: 3145728, // 3MB
  },
  {
    id: 4,
    name: "Core Web Vitals Raporu - example.com",
    customerName: "ABC Teknoloji Ltd. Şti.",
    type: "Core Web Vitals",
    date: "2024-02-10",
    status: "sent",
    size: 1572864, // 1.5MB
  },
];

export async function GET() {
  return NextResponse.json(reports);
}
