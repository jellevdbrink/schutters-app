import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { GameFilters } from '../pages/games/filter-modal/filter-modal.component';

export enum StorageKeys {
  TOURNAMENT = 'tournament',
  ROUND = 'round',
  TEAM = 'team',
  GAMEFILTERS = 'gameFilters',
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

  public getGameFilters(): GameFilters | null {
    const gameFilters = this.getItem(StorageKeys.GAMEFILTERS);
    return gameFilters ? JSON.parse(gameFilters) : null;
  }

  public setItem(key: StorageKeys, value: string | number | boolean): void {
    localStorage.setItem(key, value.toString());
  }

  public removeItem(key: StorageKeys): void {
    localStorage.removeItem(key);
  }

  public clear(): void {
    localStorage.clear();
  }
}
