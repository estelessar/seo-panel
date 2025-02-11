"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, AlertTriangle, CheckCircle } from "lucide-react";

interface SEOAlert {
  type: "warning" | "error" | "success";
  message: string;
  details?: any;
}

interface SEOAlertsProps {
  alerts: SEOAlert[];
}

export function SEOAlerts({ alerts }: SEOAlertsProps) {
  if (!alerts || alerts.length === 0) {
    return (
      <Alert className="bg-green-50 border-green-200">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-600">Harika!</AlertTitle>
        <AlertDescription className="text-green-700">
          Şu an için herhangi bir SEO sorunu tespit edilmedi.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert, index) => {
        const icon =
          alert.type === "error" ? (
            <AlertCircle className="h-4 w-4 text-red-600" />
          ) : (
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          );

        const bgColor =
          alert.type === "error" ? "bg-red-50" : "bg-yellow-50";
        const borderColor =
          alert.type === "error" ? "border-red-200" : "border-yellow-200";
        const titleColor =
          alert.type === "error" ? "text-red-600" : "text-yellow-600";
        const descriptionColor =
          alert.type === "error" ? "text-red-700" : "text-yellow-700";

        return (
          <Alert
            key={index}
            className={`${bgColor} ${borderColor}`}
          >
            {icon}
            <AlertTitle className={titleColor}>
              {alert.type === "error" ? "Kritik Hata" : "Uyarı"}
            </AlertTitle>
            <AlertDescription className={descriptionColor}>
              {alert.message}
              {alert.details && (
                <details className="mt-2">
                  <summary className="cursor-pointer">Detaylar</summary>
                  <pre className="mt-2 text-sm whitespace-pre-wrap">
                    {JSON.stringify(alert.details, null, 2)}
                  </pre>
                </details>
              )}
            </AlertDescription>
          </Alert>
        );
      })}
    </div>
  );
}
