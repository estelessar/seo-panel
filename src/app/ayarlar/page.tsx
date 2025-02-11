"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Google API Ayarları</CardTitle>
          <CardDescription>
            Google Analytics ve Search Console entegrasyonu için gerekli bilgileri girin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="clientId">Google Client ID</Label>
            <Input
              id="clientId"
              placeholder="OAuth 2.0 Client ID"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientSecret">Google Client Secret</Label>
            <Input
              id="clientSecret"
              type="password"
              placeholder="OAuth 2.0 Client Secret"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="analyticsViewId">Google Analytics View ID</Label>
            <Input
              id="analyticsViewId"
              placeholder="GA-XXXXXXXXX"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="searchConsoleUrl">Search Console Site URL</Label>
            <Input
              id="searchConsoleUrl"
              placeholder="https://example.com"
            />
          </div>

          <Button className="w-full">
            Ayarları Kaydet
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
