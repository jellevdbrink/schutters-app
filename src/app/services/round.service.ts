import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Round } from '../models/round';
import { environment } from '../../environment/environment';
import { map, Observable } from 'rxjs';
import { Game } from '../models/game';
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

  private _groupRoundId = signal(this.settingsService.getLastRound());
  public groupRoundId = this._groupRoundId.asReadonly();

  constructor() {}

  public getRounds(tournamentId: number): Observable<Round[]> {
    return this.http
      .get<Round[]>(`${environment.api}/tournaments/${tournamentId}/rounds`)
      .pipe(map((rounds) => rounds.map(transformStartDate)));
  }

  public getRound(roundId: number): Observable<Round> {
    return this.http
      .get<Round>(`${environment.api}/rounds/${roundId}`)
      .pipe(map(transformStartDate));
  }

  public getGames(roundId: number): Observable<Game[]> {
    return this.http
      .get<Game[][]>(`${environment.api}/rounds/${roundId}/games`)
      .pipe(
        map((gameSeries) =>
          gameSeries.flatMap((games) => games.map(transformStartDate)),
        ),
      );
  }

  public getPoules(roundId: number): Observable<Poule[]> {
    return this.http.get<Poule[]>(
      `${environment.api}/rounds/${roundId}/ranking`,
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

  public setGroupRoundId(roundId: number | null): void {
    this._groupRoundId.set(roundId);
    if (roundId === null) {
      this.settingsService.removeItem(StorageKeys.ROUND);
    } else {
      this.settingsService.setItem(StorageKeys.ROUND, roundId.toString());
    }
  }
}
