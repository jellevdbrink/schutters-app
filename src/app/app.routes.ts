import { Routes } from '@angular/router';
import { TournamentsPage } from './pages/tournaments/tournaments.page';

export const routes: Routes = [
  { path: 'toernooien', component: TournamentsPage },
  { path: '**', redirectTo: '/toernooien' },
];
