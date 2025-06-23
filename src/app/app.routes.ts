import { Routes } from '@angular/router';
import { TournamentsPage } from './pages/tournaments/tournaments.page';
import { TournamentPage } from './pages/tournament/tournament.page';
import { SettingsPage } from './pages/settings/settings.page';
import { PoulesPage } from './pages/poules/poules.page';
import { GamesPage } from './pages/games/games.page';
import { TvPage } from './pages/tv/tv.page';
import { WaitPage } from './pages/wait/wait.page';
import { environment } from '../environment/environment';

const REDIRECT_TO_WAIT_PAGE = true;

export const routes: Routes = [
  ...(environment.production && REDIRECT_TO_WAIT_PAGE
    ? [
        { path: 'geduld', title: 'Schutterstoernooi', component: WaitPage },
        { path: '**', redirectTo: '/geduld' },
      ]
    : []),

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

  { path: 'tv', title: 'TV', component: TvPage },

  { path: 'instellingen', title: 'Instellingen', component: SettingsPage },

  { path: 'home', title: 'Home', component: TournamentPage },
  { path: '**', redirectTo: '/home' },
];
