import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';

export enum StorageKeys {
  TOURNAMENT = 'tournament',
  ROUND = 'round',
  TEAM = 'team',
}

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor() {}

  private getItem(key: StorageKeys): string | null {
    return localStorage.getItem(key);
  }

  public getTournamentSetting(): number {
    return +(
      this.getItem(StorageKeys.TOURNAMENT) ?? environment.defaultTournament
    );
  }

  public getLastRound(): number | null {
    const lastRound = this.getItem(StorageKeys.ROUND);
    return lastRound ? +lastRound : null;
  }

  public getTeamSetting(): number | null {
    const team = this.getItem(StorageKeys.TEAM);
    return team ? +team : null;
  }

  public setItem(key: StorageKeys, value: string): void {
    localStorage.setItem(key, value);
  }

  public removeItem(key: StorageKeys): void {
    localStorage.removeItem(key);
  }

  public clear(): void {
    localStorage.clear();
  }
}
