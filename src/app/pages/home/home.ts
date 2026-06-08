import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  butonlar: any[] = [
    { text: 'Stok RBK', url: '/stokrbk', icon: 'bi bi-building-fill-add' },
    { text: 'Stoklar', url: '/stoklar', icon: 'bi bi-building-add' },
    { text: 'Cariler', url: '/cariler', icon: 'bi bi-people-fill' },
    { text: 'Fatura/İrsaliye', url: '/faturalar', icon: 'bi bi-receipt-cutoff' },
    { text: 'Cari Belgeler', url: '/caribelgeler', icon: 'bi bi-cash-stack' },
    { text: 'Siparişler', url: '/siparisler', icon: 'bi bi-amazon' },
    { text: 'Fiyat Teklifleri', url: '/fiyatteklifleri', icon: 'bi bi-person-lines-fill' },
    { text: 'Depo Belgeleri', url: '/depobelgeleri', icon: 'bi bi-truck' },
    { text: 'Stok Belgesi', url: '/stokbelgesi', icon: 'bi bi-file-earmark-richtext-fill' },
    { text: 'Kasa Fişleri', url: '/kasafisleri', icon: 'bi bi-suitcase-lg-fill' },
    { text: 'Sevk', url: '/sevk', icon: 'bi bi-bus-front-fill' },
    { text: 'Banka', url: '/banka', icon: 'bi bi-safe2-fill' },
    { text: 'Peşin satış', url: '/pesinsatis', icon: 'bi bi-wallet2' },
    { text: 'Mağaza Sevk Fat', url: '/magazasevk', icon: 'bi bi-cart-check-fill' },
    { text: 'Sayım/Sarf', url: '/sayim', icon: 'bi bi-arrow-counterclockwise' },
    { text: 'Raporlar', url: '/raporlar', icon: 'bi bi-bar-chart-line' },
    { text: 'Barkod Yazdır', url: '/barkod', icon: 'bi bi-upc-scan' },
    { text: 'Ayarlar', url: '/ayarlar', icon: 'bi bi-gear' },
  ];

  openUrl(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer,width=1200,height=800');
  }
  
}
