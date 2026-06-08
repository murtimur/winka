import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { User } from '../../models/user';

export interface UserState {
  selectedUser: User | null;
}

const STORAGE_KEY = 'user';
const raw = localStorage.getItem(STORAGE_KEY);

const initialUserState: UserState = {
  selectedUser: raw ? JSON.parse(raw) : null,
};

export const UserStore = signalStore(
  { providedIn: 'root' },

  withState(initialUserState),

  withMethods((store, router = inject(Router)) => ({
    selectUser(user: User | null) {
      if (!user) return;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        patchState(store, { selectedUser: user });
        router.navigate(['/user']);
      } catch (e) {
        console.error('💥 STORAGE ERROR:', e);
      }
    },

    clearSelectedUser() {
      localStorage.removeItem(STORAGE_KEY);
      patchState(store, { selectedUser: null });
    },
  })),
);
