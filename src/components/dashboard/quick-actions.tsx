"use client"

import { FileText, Search, Send, Settings } from "lucide-react"
import Link from "next/link"

const actions = [
  {
    title: "Yeni SEO Raporu",
    description: "Yeni bir SEO analiz raporu oluştur",
    icon: Search,
    href: "/seo-raporlari/yeni",
    color: "text-blue-500"
  },
  {
    title: "Yeni Teklif",
    description: "Yeni bir müşteri teklifi hazırla",
    icon: FileText,
    href: "/teklifler/yeni",
    color: "text-purple-500"
  },
  {
    title: "Rapor Gönder",
    description: "Mevcut bir raporu e-posta ile gönder",
    icon: Send,
    href: "/seo-raporlari",
    color: "text-green-500"
  },
  {
    title: "API Ayarları",
    description: "Google API ayarlarını yapılandır",
    icon: Settings,
    href: "/ayarlar",
    color: "text-orange-500"
  }
]

export function QuickActions() {
  return (
    <div className="dashboard-card">
      <h2 className="mb-6 text-lg font-semibold">Hızlı İşlemler</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {actions.map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className="quick-action-button group"
          >
            <div className={`rounded-full p-3 ${action.color} bg-opacity-10 group-hover:bg-opacity-20 transition-all`}>
              <action.icon className={`h-6 w-6 ${action.color}`} />
            </div>
            <div className="mt-2 space-y-1">
              <h3 className="text-sm font-medium">{action.title}</h3>
              <p className="text-xs text-muted-foreground">
                {action.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
