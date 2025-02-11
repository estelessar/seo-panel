"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SitePerformanceProps {
  performance: number;
  metrics: {
    lcp: number;
    fid: number;
    cls: number;
  };
}

export function SitePerformance({ performance, metrics }: SitePerformanceProps) {
  const formatMetric = (name: string, value: number) => {
    switch (name) {
      case "lcp":
        return `${(value / 1000).toFixed(2)}s`;
      case "fid":
        return `${value.toFixed(2)}ms`;
      case "cls":
        return value.toFixed(3);
      default:
        return value.toString();
    }
  };

  const getMetricStatus = (name: string, value: number) => {
    switch (name) {
      case "lcp":
        return value < 2500 ? "good" : value < 4000 ? "needs-improvement" : "poor";
      case "fid":
        return value < 100 ? "good" : value < 300 ? "needs-improvement" : "poor";
      case "cls":
        return value < 0.1 ? "good" : value < 0.25 ? "needs-improvement" : "poor";
      default:
        return "good";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-green-600";
      case "needs-improvement":
        return "text-yellow-600";
      case "poor":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Site Performansı</CardTitle>
        <CardDescription>Core Web Vitals metrikleri</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Genel Performans</span>
              <span className={`text-sm font-medium ${getStatusColor(
                performance >= 90 ? "good" : performance >= 50 ? "needs-improvement" : "poor"
              )}`}>
                {performance}%
              </span>
            </div>
            <Progress value={performance} className="h-2" />
          </div>

          <div className="grid gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">
                  Largest Contentful Paint (LCP)
                </span>
                <span className={`text-sm font-medium ${getStatusColor(
                  getMetricStatus("lcp", metrics.lcp)
                )}`}>
                  {formatMetric("lcp", metrics.lcp)}
                </span>
              </div>
              <Progress
                value={(2500 / metrics.lcp) * 100}
                className="h-1"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">
                  First Input Delay (FID)
                </span>
                <span className={`text-sm font-medium ${getStatusColor(
                  getMetricStatus("fid", metrics.fid)
                )}`}>
                  {formatMetric("fid", metrics.fid)}
                </span>
              </div>
              <Progress
                value={(100 / metrics.fid) * 100}
                className="h-1"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">
                  Cumulative Layout Shift (CLS)
                </span>
                <span className={`text-sm font-medium ${getStatusColor(
                  getMetricStatus("cls", metrics.cls)
                )}`}>
                  {formatMetric("cls", metrics.cls)}
                </span>
              </div>
              <Progress
                value={(0.1 / metrics.cls) * 100}
                className="h-1"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
