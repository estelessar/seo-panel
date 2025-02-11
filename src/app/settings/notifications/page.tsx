"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Bell,
  Mail,
  AlertTriangle,
  FileText,
  ChartBar,
  Megaphone,
  AlertCircle,
  Send,
  Info,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
}

export default function NotificationsPage() {
  const [emailNotifications, setEmailNotifications] = React.useState<NotificationSetting[]>([
    {
      id: "new-report",
      title: "Yeni SEO Raporu Hazır",
      description: "SEO raporları hazır olduğunda bildirim al",
      icon: <FileText className="h-4 w-4" />,
      enabled: true,
    },
    {
      id: "new-proposal",
      title: "Yeni Teklif Gönderildi",
      description: "Yeni teklif gönderildiğinde bildirim al",
      icon: <ChartBar className="h-4 w-4" />,
      enabled: true,
    },
    {
      id: "site-error",
      title: "Site Hatası Tespit Edildi",
      description: "Site hatası tespit edildiğinde acil bildirim al",
      icon: <AlertTriangle className="h-4 w-4" />,
      enabled: true,
    },
  ]);

  const [systemNotifications, setSystemNotifications] = React.useState<NotificationSetting[]>([
    {
      id: "updates",
      title: "Güncellemeler ve Duyurular",
      description: "Sistem güncellemeleri ve önemli duyurular hakkında bildirim al",
      icon: <Megaphone className="h-4 w-4" />,
      enabled: true,
    },
    {
      id: "alerts",
      title: "Önemli Uyarılar",
      description: "Sistem güvenliği ve performansı ile ilgili önemli uyarılar al",
      icon: <AlertCircle className="h-4 w-4" />,
      enabled: true,
    },
    {
      id: "recommendations",
      title: "Raporlar & Öneriler",
      description: "Özelleştirilmiş analiz raporları ve iyileştirme önerileri al",
      icon: <ChartBar className="h-4 w-4" />,
      enabled: true,
    },
  ]);

  const toggleAllEmailNotifications = (enabled: boolean) => {
    setEmailNotifications((prev) =>
      prev.map((notification) => ({ ...notification, enabled }))
    );
    toast.success(
      enabled ? "Tüm e-posta bildirimleri açıldı" : "Tüm e-posta bildirimleri kapatıldı"
    );
  };

  const toggleAllSystemNotifications = (enabled: boolean) => {
    setSystemNotifications((prev) =>
      prev.map((notification) => ({ ...notification, enabled }))
    );
    toast.success(
      enabled ? "Tüm sistem bildirimleri açıldı" : "Tüm sistem bildirimleri kapatıldı"
    );
  };

  const toggleEmailNotification = (id: string, enabled: boolean) => {
    setEmailNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, enabled } : notification
      )
    );
    const notification = emailNotifications.find((n) => n.id === id);
    if (notification) {
      toast.success(
        enabled
          ? `${notification.title} bildirimi açıldı`
          : `${notification.title} bildirimi kapatıldı`
      );
    }
  };

  const toggleSystemNotification = (id: string, enabled: boolean) => {
    setSystemNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, enabled } : notification
      )
    );
    const notification = systemNotifications.find((n) => n.id === id);
    if (notification) {
      toast.success(
        enabled
          ? `${notification.title} bildirimi açıldı`
          : `${notification.title} bildirimi kapatıldı`
      );
    }
  };

  const sendTestNotification = (type: "email" | "system") => {
    if (type === "email") {
      toast.success("Test e-postası gönderildi!", {
        description: "Lütfen gelen kutunuzu kontrol edin.",
        icon: <Mail className="h-4 w-4" />,
      });
    } else {
      toast.success("Test bildirimi gönderildi!", {
        description: "Panel bildirimi başarıyla test edildi.",
        icon: <Bell className="h-4 w-4" />,
      });
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Bildirim Ayarları</h1>
          <p className="text-muted-foreground mt-1 flex items-center gap-2">
            <Info className="h-4 w-4" />
            Bildirim tercihlerinizi yönetin ve test edin
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              E-posta Bildirimleri
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => sendTestNotification("email")}
              >
                <Send className="h-4 w-4" />
                Test Et
              </Button>
              <Switch
                checked={emailNotifications.every((n) => n.enabled)}
                onCheckedChange={toggleAllEmailNotifications}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {emailNotifications.map((notification) => (
              <div key={notification.id}>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="flex items-center gap-2">
                      {notification.icon}
                      {notification.title}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                  </div>
                  <Switch
                    checked={notification.enabled}
                    onCheckedChange={(checked) =>
                      toggleEmailNotification(notification.id, checked)
                    }
                  />
                </div>
                <Separator className="my-4" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Sistem Bildirimleri
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => sendTestNotification("system")}
              >
                <Send className="h-4 w-4" />
                Test Et
              </Button>
              <Switch
                checked={systemNotifications.every((n) => n.enabled)}
                onCheckedChange={toggleAllSystemNotifications}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemNotifications.map((notification) => (
              <div key={notification.id}>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="flex items-center gap-2">
                      {notification.icon}
                      {notification.title}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                  </div>
                  <Switch
                    checked={notification.enabled}
                    onCheckedChange={(checked) =>
                      toggleSystemNotification(notification.id, checked)
                    }
                  />
                </div>
                <Separator className="my-4" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
