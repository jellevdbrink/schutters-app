import { inject, Injectable } from '@angular/core';
import { Tournament } from '../models/tournament';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { map, Observable } from 'rxjs';
import { transformEventDate } from '../../helpers';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  private http = inject(HttpClient);

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
}
