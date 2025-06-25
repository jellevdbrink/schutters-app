import { inject, Injectable } from '@angular/core';
import { Tournament } from '../models/tournament';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { map, Observable } from 'rxjs';
import { transformEventDate, transformStartDate } from '../../helpers';
import { SettingsService } from './settings.service';
import { Game, KOGame } from '../models/game';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  private http = inject(HttpClient);
  private settingsService = inject(SettingsService);

  constructor() {}

  public getTournaments(): Observable<Tournament[]> {
    return this.http
      .get<
        Tournament[]
      >(`${environment.api}/organisations/${environment.organisation}`)
      .pipe(map((tournaments) => tournaments.map(transformEventDate)));
  }

  public getTournament(tournamentId: number): Observable<Tournament> {
    return this.http
      .get<Tournament>(`${environment.api}/tournaments/${tournamentId}`)
      .pipe(map(transformEventDate));
  }

  public getGamesByTeam(
    teamId: number,
    tournamentId = this.settingsService.activeTournament(),
  ) {
    return this.http
      .get<
        (Game | KOGame)[]
      >(`${environment.api}/tournaments/${tournamentId}/games?team_id=${teamId}`)
      .pipe(map((games) => games.map(transformStartDate)));
  }
}
