import { Routes } from '@angular/router';
import { Signup } from './pages/signup/signup';
import { Auth } from './pages/auth/auth';
import { UserList } from './pages/user-list/user-list';
import { Userpage } from './pages/userpage/userpage';
import { Home } from './pages/home/home';
import { Stokrbkpages } from './pages/stoklarpages/stokrbkpages/stokrbkpages';
import { Barkodpages } from './pages/barkodpages/barkodpages';

export const routes: Routes = [
  { path: '', component: Auth },
  { path: 'home', component: Home },
  { path: 'signup', component: Signup },
  { path: 'users', component: UserList },
  { path: 'user', component: Userpage },
  { path: 'stokrbk', component: Stokrbkpages },
  { path: 'barkod', component: Barkodpages },
];
