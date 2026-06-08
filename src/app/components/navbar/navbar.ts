import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { AuthStore } from '../../stores/auth/auth.store';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  readonly #authStore = inject(AuthStore);
  readonly #authService = inject(AuthService);
  readonly #toast = inject(ToastService);

  readonly authUser = computed(()=>this.#authStore.selectedAuth());

  logout() {
    this.#authStore.clearSelectedAuth();
    this.#authService.logout().subscribe({
      next: ()=> this.#toast.success('Çıkış Başarılı.'),
      error: (err)=> {
        this.#toast.error('Bir hata oluştu!');
        console.log(err);
      }
    })
  }
}
