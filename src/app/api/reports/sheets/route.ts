import { NextResponse } from "next/server";

// Mock data for sheets reports
const reports = [
  {
    id: 1,
    name: "Site Trafik Analizi - example.com",
    customerName: "ABC Teknoloji Ltd. Şti.",
    date: "2024-02-01",
    sheetUrl: "https://docs.google.com/spreadsheets/d/example1",
    shared: true,
  },
  {
    id: 2,
    name: "SEO Performans Raporu - example.com",
    customerName: "XYZ Yazılım A.Ş.",
    date: "2024-02-05",
    sheetUrl: "https://docs.google.com/spreadsheets/d/example2",
    shared: false,
  },
  {
    id: 3,
    name: "Aylık Analitik Raporu - example.com",
    customerName: "123 Digital",
    date: "2024-02-08",
    sheetUrl: "https://docs.google.com/spreadsheets/d/example3",
    shared: true,
  },
  {
    id: 4,
    name: "Backlink Analizi - example.com",
    customerName: "ABC Teknoloji Ltd. Şti.",
    date: "2024-02-10",
    sheetUrl: "https://docs.google.com/spreadsheets/d/example4",
    shared: true,
  },
];

export async function GET() {
  return NextResponse.json(reports);
}
