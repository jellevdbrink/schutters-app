import { Routes } from '@angular/router';
import { TournamentsPage } from './pages/tournaments/tournaments.page';
import { TournamentPage } from './pages/tournament/tournament.page';

export const routes: Routes = [
  { path: 'toernooien/:tournamentId', component: TournamentPage},
  { path: 'toernooien', component: TournamentsPage },
  { path: '**', redirectTo: '/toernooien' },
];
