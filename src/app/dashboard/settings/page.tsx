"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle2, Settings } from "lucide-react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const { data: session } = useSession();
  const [googleStatus, setGoogleStatus] = useState<'connected' | 'disconnected' | 'loading'>('loading');
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    checkGoogleConnection();
    loadEnvValues();
  }, [session]);

  const loadEnvValues = async () => {
    try {
      setError("");
      setLoading(true);

      const response = await fetch('/api/settings/env', {
        cache: 'no-store'
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Ayarlar yüklenemedi');
      }

      setClientId(data.GOOGLE_CLIENT_ID || "");
      setClientSecret(data.GOOGLE_CLIENT_SECRET || "");
    } catch (error: any) {
      console.error('Ayarlar yüklenirken hata:', error);
      setError(error.message || 'Ayarlar yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const checkGoogleConnection = async () => {
    try {
      const response = await fetch('/api/google/check-connection');
      const data = await response.json();
      setGoogleStatus(data.connected ? 'connected' : 'disconnected');
    } catch (error) {
      setGoogleStatus('disconnected');
    }
  };

  const handleSaveAndConnect = async () => {
    setLoading(true);
    setError("");
    
    try {
      // Önce API bilgilerini kaydet
      const saveResponse = await fetch('/api/settings/env', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          GOOGLE_CLIENT_ID: clientId,
          GOOGLE_CLIENT_SECRET: clientSecret,
        }),
      });

      if (!saveResponse.ok) {
        const saveData = await saveResponse.json();
        throw new Error(saveData.error || 'API bilgileri kaydedilemedi');
      }

      // Google ile bağlan
      const result = await signIn('google', {
        callbackUrl: `${window.location.origin}/dashboard`,
        redirect: true
      });
      
    } catch (error: any) {
      console.error('Hata:', error);
      setError(error.message || 'Bir hata oluştu');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <span className="ml-2">Ayarlar yükleniyor...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Ayarlar</h1>
        <p className="text-muted-foreground">
          API bağlantıları ve sistem ayarlarını buradan yönetebilirsiniz.
        </p>
      </div>

      <Tabs defaultValue="google" className="space-y-4">
        <TabsList>
          <TabsTrigger value="google">Google API</TabsTrigger>
          <TabsTrigger value="notifications">Bildirimler</TabsTrigger>
          <TabsTrigger value="system">Sistem</TabsTrigger>
        </TabsList>

        <TabsContent value="google" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-6 w-6" />
                Google API Yapılandırması
              </CardTitle>
              <CardDescription>
                Google servisleri için gerekli kimlik bilgilerini buradan yönetin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="clientId">Client ID</Label>
                <Input
                  id="clientId"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  placeholder="Örn: 123456789-abcdef.apps.googleusercontent.com"
                  type="text"
                />
                <p className="text-sm text-muted-foreground">
                  Google Cloud Console &gt; Credentials &gt; OAuth 2.0 Client IDs
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientSecret">Client Secret</Label>
                <Input
                  id="clientSecret"
                  value={clientSecret}
                  onChange={(e) => setClientSecret(e.target.value)}
                  placeholder="Örn: GOCSPX-xxxxxxxxxxxxxxxxxxxxxx"
                  type="password"
                />
              </div>

              <div className="space-y-4 mt-6">
                <h3 className="font-semibold">API Durumu</h3>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">Search Console API</p>
                      <p className="text-sm text-muted-foreground">Site trafiği ve SEO verileri</p>
                    </div>
                    <Badge variant={googleStatus === 'connected' ? 'success' : 'destructive'}>
                      {googleStatus === 'connected' ? 'Bağlı' : 'Bağlı Değil'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">Analytics API</p>
                      <p className="text-sm text-muted-foreground">Ziyaretçi analitikleri</p>
                    </div>
                    <Badge variant={googleStatus === 'connected' ? 'success' : 'destructive'}>
                      {googleStatus === 'connected' ? 'Bağlı' : 'Bağlı Değil'}
                    </Badge>
                  </div>
                </div>
              </div>

              <Alert>
                <AlertDescription className="space-y-2">
                  <p>Google API kimlik bilgilerini almak için:</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Google Cloud Console&apos;a gidin</li>
                    <li>Bir proje oluşturun veya seçin</li>
                    <li>OAuth 2.0 kimlik bilgileri oluşturun:
                      <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                        <li>Credentials &gt; Create Credentials &gt; OAuth client ID</li>
                        <li>Application type: Web application</li>
                        <li>Authorized redirect URI: <code className="bg-muted p-1 rounded">http://localhost:3000/api/auth/callback/google</code></li>
                      </ul>
                    </li>
                    <li>API&apos;leri etkinleştirin:
                      <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                        <li>Search Console API</li>
                        <li>Analytics API</li>
                      </ul>
                    </li>
                  </ol>
                  <a 
                    href="https://console.cloud.google.com/apis/dashboard" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline block mt-2"
                  >
                    Google Cloud Console&apos;u Aç
                  </a>
                </AlertDescription>
              </Alert>

              <Button 
                onClick={handleSaveAndConnect} 
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Kaydediliyor...' : 'Kimlik Bilgilerini Kaydet ve Bağlan'}
              </Button>

              {googleStatus === 'connected' ? (
                <Alert className="bg-green-50">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <AlertTitle>Google Hesabı Bağlı</AlertTitle>
                  <AlertDescription className="mt-2">
                    <div className="flex items-center gap-4">
                      <div>
                        Google hesabınız başarıyla bağlandı. Şu izinlere sahipsiniz:
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>Google Search Console verilerine erişim</li>
                          <li>Google Analytics verilerine erişim</li>
                        </ul>
                      </div>
                      <Button variant="outline" onClick={() => signIn('google', { callbackUrl: '/dashboard/settings' })}>
                        Yeniden Bağlan
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert variant="destructive">
                  <AlertCircle className="h-5 w-5" />
                  <AlertTitle>Google Hesabı Bağlı Değil</AlertTitle>
                  <AlertDescription className="mt-2">
                    <div className="flex items-center gap-4">
                      <div>
                        SEO verilerini görüntüleyebilmek için Google hesabınızla bağlantı kurmanız gerekiyor.
                      </div>
                      <Button onClick={() => signIn('google', { callbackUrl: '/dashboard/settings' })}>
                        Google ile Bağlan
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Bildirim Ayarları</CardTitle>
              <CardDescription>
                E-posta ve sistem bildirimleri tercihlerinizi yönetin
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Bildirim ayarları içeriği buraya gelecek */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>Sistem Ayarları</CardTitle>
              <CardDescription>
                Genel sistem ayarlarını yapılandırın
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Sistem ayarları içeriği buraya gelecek */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
