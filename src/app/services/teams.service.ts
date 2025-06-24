import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../models/team';
import { environment } from '../../environment/environment';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  private http = inject(HttpClient);
  private settingsService = inject(SettingsService);

  constructor() {}

  public getTeams(
    tournamentId: number = this.settingsService.activeTournament(),
  ): Observable<Team[]> {
    return this.http.get<Team[]>(
      `${environment.api}/tournaments/${tournamentId}/teams`,
    );
  }
}
