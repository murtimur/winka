import { Component, inject, signal } from '@angular/core';
import { ErrorMap } from '../../models/error.map';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs';
import { ToastService } from '../../services/toast.service';
import { InputComponent } from '../../components/input-component/input-component';
import { ButtonComponent } from '../../components/button-component/button-component';
import { AuthStore } from '../../stores/auth/auth.store';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, FormsModule, InputComponent, ButtonComponent],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {

  readonly #authStore = inject(AuthStore);

  readonly #authService = inject(AuthService);
  readonly #toastService = inject(ToastService);

  readonly username = signal<string>('');
  readonly password = signal<string>('');
  readonly loading = signal<boolean>(false);
  readonly errorMessage = signal<string>('');
  readonly errors = signal<ErrorMap>({});

  onPasswordChange(event: any) {
    this.password.set(event);
    this.errorMessage.set('');
    this.clearError('password');
  }

  onUsernameChange(event: any) {
    this.username.set(event);
    this.clearError('username');
    this.errorMessage.set('');
  }

  clearError(field: keyof ErrorMap) {
    this.errors.update((errors) => {
      const copy = { ...errors };
      delete copy[field];
      return copy;
    });
  }

  onSubmitLogin() {
    this.loading.set(true);
    const body = {username: this.username(), password: this.password()};
    this.#authService.login(body).pipe(finalize(()=> this.loading.set(false)))
      .subscribe({
        next: (data)=> {
          this.#authStore.selectAuth(data.user);
        },
        error: (err) => {
          if(err.error?.validationErrors) {
            this.errors.set(err.error.validationErrors);
          } else if(err.error?.message) {
            this.errorMessage.set(err.error.message);
          } else {
            this.#toastService.error("Beklenmeyen bir hata oluştu!");
          }
        }
      })
  }
}
