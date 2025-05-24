import { Routes } from '@angular/router';
import { TournamentsPage } from './pages/tournaments/tournaments.page';
import { TournamentPage } from './pages/tournament/tournament.page';
import { SettingsPage } from './pages/settings/settings.page';
import { PoulesPage } from './pages/poules/poules.page';
import { GamesPage } from './pages/games/games.page';

export const routes: Routes = [
  {
    path: 'toernooien/:tournamentId',
    title: 'Toernooi',
    component: TournamentPage,
  },
  { path: 'toernooien', title: 'Toernooien', component: TournamentsPage },

  { path: 'standen', title: 'Standen', component: PoulesPage },
  // { path: 'rondes/:roundId/stand', component: },
  // { path: 'rondes/:roundId/wedstrijden', component: },

  { path: 'wedstrijden', title: 'Wedstrijden', component: GamesPage },

  { path: 'instellingen', title: 'Instellingen', component: SettingsPage },

  { path: 'home', title: 'Home', component: TournamentPage },
  { path: '**', redirectTo: '/home' },
];
