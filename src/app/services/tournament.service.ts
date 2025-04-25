import { inject, Injectable } from '@angular/core';
import { Tournament } from '../models/tournament';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  private http = inject(HttpClient);

  constructor() {}

  public getTournaments(): Observable<Tournament[]> {
    return this.http
      .get<Tournament[]>(`${environment.api}/organisations/1`)
      .pipe(map((tournaments) => tournaments.map(this.transformTournament)));
  }

  public getTournament(tournamentId: number): Observable<Tournament> {
    return this.http
      .get<Tournament>(`${environment.api}/tournaments/${tournamentId}`)
      .pipe(map(this.transformTournament));
  }

  private transformTournament = (tournament: Tournament): Tournament => ({
    ...tournament,
    event_date: new Date(tournament.event_date),
  });
}
