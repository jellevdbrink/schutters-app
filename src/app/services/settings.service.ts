import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';

export enum StorageKeys {
  TOURNAMENT = 'tournament',
  TEAM = 'team',
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor() { }

  private getItem(key: StorageKeys): string | null {
    return localStorage.getItem(key);
  }

  public getTournamentSetting(): string {
    return this.getItem(StorageKeys.TOURNAMENT) ?? environment.defaultTournament;
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
