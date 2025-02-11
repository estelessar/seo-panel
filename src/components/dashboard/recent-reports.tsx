"use client"

import { Download, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

const recentReports = [
  {
    client: "Örnek Şirket A.Ş.",
    date: "10 Şubat 2024",
    type: "SEO Analiz Raporu",
    status: "completed",
    improvement: "+15%"
  },
  {
    client: "Test Limited",
    date: "8 Şubat 2024",
    type: "Aylık SEO Raporu",
    status: "completed",
    improvement: "+8%"
  },
  {
    client: "Demo Holding",
    date: "5 Şubat 2024",
    type: "Site Hızı Raporu",
    status: "pending",
    improvement: "devam ediyor"
  }
]

export function RecentReports() {
  return (
    <div className="dashboard-card">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Son Raporlar</h2>
        <Button variant="outline" size="sm">
          Tümünü Gör
        </Button>
      </div>
      
      <div className="space-y-4">
        {recentReports.map((report, index) => (
          <div
            key={index}
            className="activity-item group"
          >
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{report.client}</h3>
                <span className={`rounded-full px-2 py-0.5 text-xs ${
                  report.status === 'completed' 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                }`}>
                  {report.status === 'completed' ? 'Tamamlandı' : 'Devam Ediyor'}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {report.type} • {report.date}
              </p>
              {report.status === 'completed' && (
                <p className="text-sm font-medium text-green-600 dark:text-green-400">
                  Performans İyileştirmesi: {report.improvement}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
