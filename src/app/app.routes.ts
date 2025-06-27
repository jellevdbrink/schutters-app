import { Routes } from '@angular/router';
import { TournamentsPage } from './pages/tournaments/tournaments.page';
import { TournamentPage } from './pages/tournament/tournament.page';
import { PoulesPage } from './pages/poules/poules.page';
import { GamesPage } from './pages/games/games.page';
import { TvPage } from './pages/tv/tv.page';
import { WaitPage } from './pages/wait/wait.page';
import { environment } from '../environment/environment';
import { HomePage } from './pages/home/home.page';
import { NewsPage } from './pages/news/news.page';

const REDIRECT_TO_WAIT_PAGE = true;

export const routes: Routes = [
  ...(environment.production && REDIRECT_TO_WAIT_PAGE
    ? [
        { path: 'geduld', title: 'Schutterstoernooi', component: WaitPage },
        { path: '**', redirectTo: '/geduld' },
      ]
    : []),

  { path: 'home', title: 'Home', component: HomePage },
  { path: 'standen', title: 'Standen', component: PoulesPage },
  { path: 'wedstrijden', title: 'Wedstrijden', component: GamesPage },
  { path: 'news', title: 'Nieuws', component: NewsPage },

  { path: 'tv', title: 'TV', component: TvPage },

  {
    path: 'toernooien/:tournamentId',
    title: 'Toernooi',
    component: TournamentPage,
  },
  { path: 'toernooien', title: 'Toernooien', component: TournamentsPage },

  { path: '**', redirectTo: '/home' },
];
