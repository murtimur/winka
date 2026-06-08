import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { User } from '../../models/user';

export interface AuthState {
  selectedAuth: User | null;
}

const STORAGE_KEY = 'auth';

const raw = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;

const initialAuthState: AuthState = {
  selectedAuth: raw ? (() => { try { return JSON.parse(raw); } catch { return null; } })() : null,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },

  withState(initialAuthState),

  withMethods((store, router = inject(Router)) => ({
    selectAuth(user: User | null) {
      if (!user) return;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        patchState(store, { selectedAuth: user });
        router.navigate(['/home']);
      } catch (e) {
        console.error('💥 STORAGE ERROR:', e);
      }
    },

    clearSelectedAuth() {
      localStorage.removeItem(STORAGE_KEY);
      patchState(store, { selectedAuth: null });
      router.navigate(['/']);
    },
  })),
);
