"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, Line, Doughnut } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

export const StatsCards = ({ data, loading }: { data: any; loading: boolean }) => {
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const stats = [
    {
      title: "Toplam Tıklama",
      value: data?.searchData?.totals?.[0]?.clicks || 0,
    },
    {
      title: "Toplam Görüntülenme",
      value: data?.searchData?.totals?.[0]?.impressions || 0,
    },
    {
      title: "Aktif Kullanıcılar",
      value: data?.analyticsData?.basicMetrics?.[0]?.activeUsers || 0,
    },
    {
      title: "Ortalama Oturum Süresi",
      value: formatDuration(data?.analyticsData?.basicMetrics?.[0]?.averageSessionDuration || 0),
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export const DetailedStats = ({ data, loading }: { data: any; loading: boolean }) => {
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>
                <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const trafficSourceData = {
    labels: data?.analyticsData?.trafficSource?.map((source: any) => source.sessionSource) || [],
    datasets: [
      {
        label: "Aktif Kullanıcılar",
        data: data?.analyticsData?.trafficSource?.map((source: any) => source.activeUsers) || [],
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
    ],
  }

  const deviceData = {
    labels: data?.analyticsData?.devices?.map((device: any) => device.deviceCategory) || [],
    datasets: [
      {
        data: data?.analyticsData?.devices?.map((device: any) => device.activeUsers) || [],
        backgroundColor: [
          "rgba(59, 130, 246, 0.5)",
          "rgba(16, 185, 129, 0.5)",
          "rgba(245, 158, 11, 0.5)",
        ],
      },
    ],
  }

  const countryData = {
    labels: data?.analyticsData?.countries?.slice(0, 5).map((country: any) => country.country) || [],
    datasets: [
      {
        label: "Aktif Kullanıcılar",
        data:
          data?.analyticsData?.countries?.slice(0, 5).map((country: any) => country.activeUsers) || [],
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
    ],
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Trafik Kaynakları</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar
            data={trafficSourceData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cihaz Dağılımı</CardTitle>
        </CardHeader>
        <CardContent>
          <Doughnut
            data={deviceData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>En İyi 5 Ülke</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar
            data={countryData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}m ${remainingSeconds}s`
}
