# SEO Panel

Modern SEO yönetim ve analiz paneli. Next.js, Prisma ve TypeScript ile geliştirilmiştir.

## Özellikler

- Google Search Console entegrasyonu
- Google Analytics entegrasyonu
- SEO rapor oluşturma
- Müşteri yönetimi
- Otomatik raporlama
- Modern ve kullanıcı dostu arayüz

## Kurulum

1. Repository'yi klonlayın:
```bash
git clone https://github.com/estelessar/seo-panel.git
cd seo-panel
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Veritabanını hazırlayın:
```bash
npx prisma migrate dev
```

4. Örnek .env dosyasını kopyalayın ve gerekli bilgileri girin:
```bash
cp .env.example .env
```

5. Uygulamayı başlatın:
```bash
npm run dev
```

## Teknolojiler

- Next.js 14
- TypeScript
- Prisma
- Tailwind CSS
- NextAuth.js
- Google APIs

## Lisans

MIT
