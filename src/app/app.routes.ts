import { Routes } from '@angular/router';
import { TournamentsPage } from './pages/tournaments/tournaments.page';
import { TournamentPage } from './pages/tournament/tournament.page';
import { SettingsPage } from './pages/settings/settings.page';
import { PoulesPage } from './pages/poules/poules.page';
import { GamesPage } from './pages/games/games.page';

export const routes: Routes = [
  { path: 'toernooien/:tournamentId', component: TournamentPage },
  { path: 'toernooien', component: TournamentsPage },

  { path: 'standen', component: PoulesPage },
  // { path: 'rondes/:roundId/stand', component: },
  // { path: 'rondes/:roundId/wedstrijden', component: },

  { path: 'wedstrijden', component: GamesPage },

  { path: 'instellingen', component: SettingsPage },

  { path: 'home', component: TournamentPage },
  { path: '**', redirectTo: '/home' },
];
