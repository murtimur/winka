import {
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  AfterViewInit,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface StockInfo {
  code: string;
  name: string;
  unit: string;
  stock: number;
  price: number;
}

interface TableRow {
  id: number;
  inputValue: string;
  loading: boolean;
  stock: StockInfo | null;
  quantity: number;
  error: string;
  locked: boolean;
}

const MOCK_DB: Record<string, StockInfo> = {
  A001: { code: 'A001', name: 'Laptop Dell XPS 15', unit: 'Adet', stock: 42, price: 45000 },
  A002: { code: 'A002', name: 'Klavye Mekanik', unit: 'Adet', stock: 158, price: 1200 },
  A003: { code: 'A003', name: 'Mouse Logitech MX', unit: 'Adet', stock: 75, price: 850 },
  B001: { code: 'B001', name: 'Monitör 27" 4K', unit: 'Adet', stock: 23, price: 18500 },
  B002: { code: 'B002', name: 'Kulaklık Sony WH-1000', unit: 'Adet', stock: 60, price: 6200 },
  C001: { code: 'C001', name: 'USB-C Kablo 2m', unit: 'Adet', stock: 320, price: 150 },
  C002: { code: 'C002', name: 'HDMI Adaptör', unit: 'Adet', stock: 0, price: 280 },
  D001: { code: 'D001', name: 'SSD 1TB Samsung', unit: 'Adet', stock: 89, price: 3400 },
};

@Component({
  selector: 'app-barkodpages',
  imports: [CommonModule, FormsModule],
  templateUrl: './barkodpages.html',
  styleUrl: './barkodpages.scss',
})
export class Barkodpages implements OnInit, AfterViewInit {
  @ViewChildren('codeInput') codeInputs!: QueryList<ElementRef<HTMLInputElement>>;

  constructor(private cdr: ChangeDetectorRef) {}

  rows: TableRow[] = [];
  private nextId = 1;
  private focusNext = false;

  today = new Date().toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  get lockedRows() {
    return this.rows.filter((r) => r.locked).length;
  }

  get grandTotal() {
    return this.rows
      .filter((r) => r.locked && r.stock)
      .reduce((sum, r) => sum + r.stock!.price * r.quantity, 0);
  }

  ngOnInit() {
    this.addRow();
  }

  ngAfterViewInit() {
    this.codeInputs.changes.subscribe(() => {
      if (this.focusNext) {
        this.focusNext = false;
        const inputs = this.codeInputs.toArray();
        inputs[inputs.length - 1]?.nativeElement.focus();
      }
    });
  }

  addRow() {
    this.rows.push({
      id: this.nextId++,
      inputValue: '',
      loading: false,
      stock: null,
      quantity: 1,
      error: '',
      locked: false,
    });
    this.focusNext = true;
    this.cdr.detectChanges();
  }

  onInput(row: TableRow) {
    if (row.stock) {
      row.stock = null;
      row.error = '';
    }
  }

  onCodeEnter(row: TableRow, index: number) {
    if (!row.inputValue.trim()) return;
    if (row.stock) {
      this.lockRow(row, index);
      return;
    }
    this.queryStock(row);
  }

  queryStock(row: TableRow) {
    const code = row.inputValue.trim().toUpperCase();
    row.loading = true;
    row.error = '';
    row.stock = null;
    this.cdr.detectChanges(); // loading spinner'ı hemen göster

    setTimeout(() => {
      row.loading = false;
      const found = MOCK_DB[code];
      if (found) {
        row.stock = found;
        row.inputValue = code;
      } else {
        row.error = `"${code}" bulunamadı`;
      }
      this.cdr.detectChanges(); // sonucu ekrana yansıt
    }, 300);
  }

  lockRow(row: TableRow, index: number) {
    if (!row.stock) return;
    row.locked = true;
    this.cdr.detectChanges();

    const hasActiveRow = this.rows.some((r) => !r.locked);
    if (!hasActiveRow) {
      this.addRow();
    } else {
      this.focusNext = true;
      setTimeout(() => {
        if (this.focusNext) {
          this.focusNext = false;
          const inputs = this.codeInputs.toArray();
          inputs[inputs.length - 1]?.nativeElement.focus();
        }
      }, 0);
    }
  }

  deleteRow(index: number) {
    this.rows.splice(index, 1);
    this.cdr.detectChanges();
    if (this.rows.every((r) => r.locked)) {
      this.addRow();
    }
  }

  clearAll() {
    this.rows = [];
    this.addRow();
  }
}
