import { NextResponse } from "next/server";

// Mock data for automated reports
const reports = [
  {
    id: 1,
    type: "SEO",
    customerName: "ABC Teknoloji Ltd. Şti.",
    lastRun: "2024-02-11T10:30:00",
    frequency: "7 günde bir",
    frequencyValue: "weekly",
    status: "success",
    active: true,
  },
  {
    id: 2,
    type: "Backlink",
    customerName: "XYZ Yazılım A.Ş.",
    lastRun: "2024-02-10T15:45:00",
    frequency: "15 günde bir",
    frequencyValue: "biweekly",
    status: "pending",
    active: true,
  },
  {
    id: 3,
    type: "Teknik SEO",
    customerName: "123 Digital",
    lastRun: "2024-02-09T09:15:00",
    frequency: "Aylık",
    frequencyValue: "monthly",
    status: "error",
    active: false,
  },
  {
    id: 4,
    type: "Site Hataları",
    customerName: "ABC Teknoloji Ltd. Şti.",
    lastRun: "2024-02-11T08:00:00",
    frequency: "Günlük",
    frequencyValue: "daily",
    status: "success",
    active: true,
  },
];

export async function GET() {
  return NextResponse.json(reports);
}
