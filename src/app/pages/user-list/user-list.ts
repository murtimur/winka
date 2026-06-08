import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { PageResponse } from '../../models/page.response';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../../components/button-component/button-component";
import { Bigspinner } from "../../components/bigspinner/bigspinner";
import { UserStore } from '../../stores/user/user.store';

@Component({
  selector: 'app-user-list',
  imports: [FormsModule, CommonModule, ButtonComponent, Bigspinner],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList {
  readonly #userService = inject(UserService);
  readonly #userStore = inject(UserStore);

  readonly users = signal<User[]>([]);

  readonly currentPage = signal(0);
  readonly totalPages = signal(0);

  readonly pageSize = signal(10);
  readonly loading = signal(false);

  ngOnInit(): void {
    this.loadUsers();
    this.#userStore.clearSelectedUser();
  }

  loadUsers() {
    this.loading.set(true);
    this.#userService.getUsers(this.currentPage(), this.pageSize()).subscribe({
      next: (response: PageResponse<User>) => {
        this.users.set(response.content);
        this.totalPages.set(response.totalPages);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  nextPage() {
    if (this.currentPage() + 1 >= this.totalPages()) {
      return;
    }
    this.currentPage.update((value) => value + 1);
    this.loadUsers();
  }

  prevPage() {
    if (this.currentPage() <= 0) {
      return;
    }
    this.currentPage.update((value) => value - 1);
    this.loadUsers();
  }

  onClickSelectUser(user: User) {
    try {
      this.#userStore.selectUser(user);
    } catch (error) {
      console.log(error);
    }
  }
}
