import { Settings } from './user.settings';

export type FieldType = 'number' | 'string' | 'select';

export interface SettingsField {
  key: keyof Settings;
  label: string;
  type: FieldType;
  group: string;
  options?: any;
}

export const SETTING_FIELDS: SettingsField[] = [
  {
    key: 'subeId',
    label: 'Şube',
    type: 'select',
    group: 'Kullanıcı Parametreleri',
    options: 'subeler',
  },
  {
    key: 'kasaId',
    label: 'Kasa',
    type: 'select',
    group: 'Kullanıcı Parametreleri',
    options: 'kasalar',
  },
  {
    key: 'winkaKullaniciId',
    label: 'Winka Kullanıcı',
    type: 'select',
    group: 'Kullanıcı Parametreleri',
    options: 'kullanicilar',
  },
  { key: 'iskontoOrani', label: 'İskonto Oranı', type: 'number', group: 'Genel' },
  { key: 'satisFaturasiDizayn', label: 'Satış Fatura Dizayn', type: 'string', group: 'Dizayn' },
  { key: 'satisIadeFaturasiDizayn', label: 'Satış İade Dizayn', type: 'string', group: 'Dizayn' },
  { key: 'alisFaturasiDizayn', label: 'Alış Dizayn', type: 'string', group: 'Dizayn' },
  { key: 'alisIadeFaturasiDizayn', label: 'Alış İade Dizayn', type: 'string', group: 'Dizayn' },
  { key: 'alinanSiparisDizayn', label: 'Alınan Sipariş Dizayn', type: 'string', group: 'Dizayn' },
  { key: 'verilenSiparisDizayn', label: 'Verilen Sipariş Dizayn', type: 'string', group: 'Dizayn' },
  { key: 'depoTransferDizayn', label: 'Depo Transfer Dizayn', type: 'string', group: 'Dizayn' },
  { key: 'cariCikisDizayn', label: 'Cari Çıkış Dizayn', type: 'string', group: 'Dizayn' },
  { key: 'cariGirisDizayn', label: 'Cari Giriş Dizayn', type: 'string', group: 'Dizayn' },
  { key: 'stokCikisBelgesiDizayn', label: 'Stok Çıkış Dizayn', type: 'string', group: 'Dizayn' },
  { key: 'stokGirisBelgesiDizayn', label: 'Stok Giriş Dizayn', type: 'string', group: 'Dizayn' },
  { key: 'yaziciAdi', label: 'Yazıcı', type: 'select', group: 'Yazicilar' },
];
