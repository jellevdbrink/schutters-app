import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Round } from '../models/round';
import { environment } from '../../environment/environment';
import { map, Observable, tap } from 'rxjs';
import { Game, KOGame } from '../models/game';
import { transformStartDate } from '../../helpers';
import { Poule } from '../models/ranking';
import { KOBracket } from '../models/ko-bracket';
import { SettingsService, StorageKeys } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class RoundService {
  private http = inject(HttpClient);
  private settingsService = inject(SettingsService);

  constructor() {}

  public getRounds(
    tournamentId: number = this.settingsService.activeTournament(),
  ): Observable<Round[]> {
    return this.http
      .get<Round[]>(`${environment.api}/tournaments/${tournamentId}/rounds`)
      .pipe(map((rounds) => rounds.map(transformStartDate)));
  }

  public getRound(roundId: number): Observable<Round> {
    return this.http
      .get<Round>(`${environment.api}/rounds/${roundId}`)
      .pipe(map(transformStartDate));
  }

  public getGames<T extends Game | KOGame>(roundId: number): Observable<T[][]> {
    return this.http
      .get<T[][]>(`${environment.api}/rounds/${roundId}/games`)
      .pipe(
        map((gameSeries) =>
          gameSeries.map((games) => games.map(transformStartDate)),
        ),
      );
  }

  public getPoules(roundId: number): Observable<Poule[]> {
    return this.http.get<Poule[]>(
      `${environment.api}/rounds/${roundId}/ranking`,
    );
  }

  public getLatestPoule(teamId: number): Observable<Poule> {
    return this.http.get<Poule>(
      `${environment.api}/teams/${teamId}/latest-poule`,
    );
  }

  public getKOBracket(roundId: number): Observable<KOBracket[]> {
    return this.http
      .get<KOBracket[]>(`${environment.api}/rounds/${roundId}/ko_bracket`)
      .pipe(
        map((koBrackets) =>
          koBrackets.map((koBracket) => ({
            ...koBracket,
            games: koBracket.games.map(transformStartDate),
          })),
        ),
      );
  }
}
