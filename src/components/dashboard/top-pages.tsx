"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TopPage {
  path: string;
  title: string;
  views: number;
}

interface TopPagesProps {
  pages: TopPage[];
}

export function TopPages({ pages }: TopPagesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>En Çok Ziyaret Edilen Sayfalar</CardTitle>
        <CardDescription>Son 30 günlük sayfa görüntülenmeleri</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sayfa</TableHead>
              <TableHead className="text-right">Görüntülenme</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.map((page, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div>
                    <div className="font-medium truncate max-w-[300px]" title={page.title}>
                      {page.title}
                    </div>
                    <div className="text-sm text-muted-foreground truncate max-w-[300px]" title={page.path}>
                      {page.path}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {page.views.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
