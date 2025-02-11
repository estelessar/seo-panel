import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { SEOReport, Proposal } from '@/types';

export class PDFExportService {
  private doc: any;

  constructor() {
    this.doc = new jsPDF();
  }

  async exportSEOReport(report: SEOReport, clientName: string) {
    // Header
    this.doc.setFontSize(20);
    this.doc.text('SEO Raporu', 14, 22);
    
    this.doc.setFontSize(12);
    this.doc.text(`Müşteri: ${clientName}`, 14, 32);
    this.doc.text(`Tarih: ${new Date(report.createdAt).toLocaleDateString('tr-TR')}`, 14, 40);

    // Metrics Table
    this.doc.autoTable({
      startY: 50,
      head: [['Metrik', 'Değer']],
      body: [
        ['Organik Trafik', report.metrics.organicTraffic],
        ['Anahtar Kelimeler', report.metrics.keywords],
        ['Backlinks', report.metrics.backlinks],
        ['Hatalar', report.metrics.errors],
      ],
    });

    // Recommendations
    const startY = this.doc.lastAutoTable.finalY + 10;
    this.doc.text('Öneriler:', 14, startY);
    
    report.recommendations.forEach((rec, index) => {
      this.doc.text(`${index + 1}. ${rec}`, 14, startY + 10 + (index * 8));
    });

    return this.doc.save(`seo-raporu-${clientName}-${new Date().toISOString().split('T')[0]}.pdf`);
  }

  async exportProposal(proposal: Proposal, clientName: string) {
    // Header
    this.doc.setFontSize(20);
    this.doc.text('SEO Hizmet Teklifi', 14, 22);
    
    this.doc.setFontSize(12);
    this.doc.text(`Müşteri: ${clientName}`, 14, 32);
    this.doc.text(`Tarih: ${new Date(proposal.createdAt).toLocaleDateString('tr-TR')}`, 14, 40);
    this.doc.text(`Geçerlilik: ${new Date(proposal.validUntil).toLocaleDateString('tr-TR')}`, 14, 48);

    // Services Table
    this.doc.autoTable({
      startY: 60,
      head: [['Hizmet', 'Açıklama', 'Fiyat']],
      body: proposal.services.map(service => [
        service.name,
        service.description,
        `${service.price.toLocaleString('tr-TR')} TL`
      ]),
      foot: [['', 'Toplam', `${proposal.totalPrice.toLocaleString('tr-TR')} TL`]],
    });

    // Terms and Conditions
    if (proposal.terms) {
      const startY = this.doc.lastAutoTable.finalY + 10;
      this.doc.text('Şartlar ve Koşullar:', 14, startY);
      this.doc.setFontSize(10);
      this.doc.text(proposal.terms, 14, startY + 10);
    }

    return this.doc.save(`teklif-${clientName}-${new Date().toISOString().split('T')[0]}.pdf`);
  }
}
