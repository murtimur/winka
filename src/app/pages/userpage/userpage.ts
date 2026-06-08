import { Component, computed, effect, inject, signal } from '@angular/core';
import { InputComponent } from '../../components/input-component/input-component';
import { ToastService } from '../../services/toast.service';
import { UserService } from '../../services/user.service';
import { ErrorMap } from '../../models/error.map';
import { SharedType } from '../../models/shared.type';
import { Permission } from '../../models/permission';
import { SETTING_FIELDS } from '../../models/user.settings.config';
import { User } from '../../models/user';
import { finalize, forkJoin } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../components/button-component/button-component';
import { UserStore } from '../../stores/user/user.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userpage',
  imports: [InputComponent, FormsModule, CommonModule, ButtonComponent],
  templateUrl: './userpage.html',
  styleUrl: './userpage.scss',
})
export class Userpage {
  readonly #userStore = inject(UserStore);
  readonly #router = inject(Router);

  userStore = computed(()=> this.#userStore.selectedUser());

  constructor() {
    this.loadOptions();
    effect(() => {
      const u = this.userStore();
      if (!u) return;
      this.user.update((current) => ({
        ...current,
        ...u,
        settings: {
          ...current.settings,
          ...u.settings,
        },
        permissions: u.authorities?.map((a) => a.permission as Permission) ?? [],
        roles: u.roles ?? [],
        password: '',
      }));
    });
  }

  readonly #userService = inject(UserService);
  readonly #toast = inject(ToastService);

  readonly errors = signal<ErrorMap>({});

  readonly loading = signal<boolean>(false);

  readonly subeler = signal<SharedType[]>([]);
  readonly kasalar = signal<SharedType[]>([]);
  readonly kullanicilar = signal<SharedType[]>([]);
  readonly yazicilar = signal<SharedType[]>([]);

  readonly username = signal('');
  readonly password = signal('');
  readonly passwordRepeat = signal('');
  readonly passwordRepeatError = computed(() => {
    const password = this.user().password;
    const repeat = this.passwordRepeat();
    return password !== repeat ? 'Şifreler aynı değil' : '';
  });

  readonly permissions = Object.values(Permission);
  readonly settings = Object.values(SETTING_FIELDS);

  readonly userRoleData = signal([
    { id: 2, name: 'Kullanıcı', value: 'ROLE_USER' },
    { id: 1, name: 'Yönetici', value: 'ROLE_ADMIN' },
    { id: 3, name: 'Operatör', value: 'ROLE_MANAGER' },
  ]);

  readonly user = signal<User>({
    username: '',
    password: '',
    status: false,
    settings: {
      subeId: 1,
      kasaId: 1,
      winkaKullaniciId: 1,
      cariOzelKod3Id: 0,
      iskontoOrani: 0,
      satisFaturasiDizayn: '',
      satisIadeFaturasiDizayn: '',
      alisFaturasiDizayn: '',
      alisIadeFaturasiDizayn: '',
      alinanSiparisDizayn: '',
      verilenSiparisDizayn: '',
      depoTransferDizayn: '',
      stokCikisBelgesiDizayn: '',
      stokGirisBelgesiDizayn: '',
      cariCikisDizayn: '',
      cariGirisDizayn: '',
      yaziciAdi: '',
    },
    authorities: [],
    roles: [
      {
        name: 'ROLE_USER',
        id: 2,
      },
    ],
    permissions: [],
  });

  onFieldChange<K extends keyof User>(key: K, value: User[K]) {
    this.user.set({
      ...this.user(),
      [key]: value,
    });
    this.clearError(key as string);
  }

  private loadOptions() {
    forkJoin({
      subeler: this.#userService.getSharedData('/api/1.0.1/subeler'),
      kasalar: this.#userService.getSharedData('/api/1.0.1/kasalar'),
      kullanicilar: this.#userService.getSharedData('/api/1.0.1/kullanicilar'),
      yazicilar: this.#userService.getSharedData('/api/1.0.1/yazicilar'),
    }).subscribe({
      next: (res) => {
        this.subeler.set(res.subeler);
        this.kasalar.set(res.kasalar);
        this.kullanicilar.set(res.kullanicilar);
        this.yazicilar.set(res.yazicilar);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getOptions(key: string): SharedType[] {
    const map: Record<string, () => SharedType[]> = {
      subeId: this.subeler,
      kasaId: this.kasalar,
      winkaKullaniciId: this.kullanicilar,
      yaziciAdi: this.yazicilar,
    };
    return map[key]?.() ?? [];
  }

  togglePermission(permission: Permission, checked: boolean) {
    this.user.update((u) => {
      const exists = u.permissions.includes(permission);
      return {
        ...u,
        permissions: checked
          ? exists
            ? u.permissions
            : [...u.permissions, permission]
          : u.permissions.filter((p) => p !== permission),
      };
    });
  }

  changeRole(roleValue: string) {
    const selectedRole = this.userRoleData().find((r) => r.value === roleValue);
    if (!selectedRole) return;
    this.user.update((u) => ({
      ...u,
      roles: [{ id: selectedRole.id, name: selectedRole.value }],
    }));
  }

  clearError(field: string) {
    if (!this.errors()[field]) return;
    this.errors.update((e) => {
      const copy = { ...e };
      delete copy[field];
      return copy;
    });
  }

  readonly isFormInvalid = computed(() => {
    return this.passwordRepeatError() || Object.keys(this.errors()).length > 0 || this.loading();
  });

  update() {
    this.loading.set(true);
    this.#userService
      .update(this.user())
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.#toast.success('Kullanıcı Güncellendi.');
          this.#router.navigate(['/users']);
        },
        error: (err) => {
          if (err.error?.validationErrors) {
            this.errors.set(err.error.validationErrors);
            this.#toast.error('Formda hatalı alanlar var!');
          } else {
            this.#toast.error('Beklenmeyen bir hata oluştu!');
          }
        },
      });
  }
}
