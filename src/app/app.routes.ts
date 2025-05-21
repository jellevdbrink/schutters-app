import { Routes } from '@angular/router';
import { TournamentsPage } from './pages/tournaments/tournaments.page';
import { TournamentPage } from './pages/tournament/tournament.page';
import { SettingsPage } from './pages/settings/settings.page';

export const routes: Routes = [
  { path: 'toernooien/:tournamentId', component: TournamentPage},
  { path: 'toernooien', component: TournamentsPage },

  { path: 'instellingen', component: SettingsPage },

  { path: 'home', component: TournamentPage },
  { path: '**', redirectTo: '/home' },
];
