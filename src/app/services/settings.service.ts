import { Injectable, signal } from '@angular/core';
import { environment } from '../../environment/environment';
import { GameFilters } from '../pages/games/filter-modal/filter-modal.component';
import { Round } from '../models/round';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

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
  public myTeam = signal(this.getTeamSetting());
  public activeTournament = signal(this.getTournamentSetting());
  public activeRound = signal(this.getActiveRound());
  public gameFilters = signal(this.getGameFilters());

  public isLoading = signal(false);

  constructor() {
    toObservable(this.myTeam)
      .pipe(takeUntilDestroyed())
      .subscribe((newMyTeam) =>
        this.setOrDeleteItem(StorageKeys.TEAM, newMyTeam),
      );
    toObservable(this.activeTournament)
      .pipe(takeUntilDestroyed())
      .subscribe((newActiveTournament) =>
        this.setItem(StorageKeys.TOURNAMENT, newActiveTournament),
      );
    toObservable(this.activeRound)
      .pipe(takeUntilDestroyed())
      .subscribe((newActiveRound) =>
        this.setOrDeleteItem(StorageKeys.ROUND, newActiveRound),
      );
    toObservable(this.gameFilters)
      .pipe(takeUntilDestroyed())
      .subscribe((newGameFilters) =>
        this.setOrDeleteItem(StorageKeys.GAMEFILTERS, newGameFilters),
      );
  }

  private getItem(key: StorageKeys): string | null {
    return localStorage.getItem(key);
  }

  private getTournamentSetting(): number {
    //   return +(
    //     this.getItem(StorageKeys.TOURNAMENT) ?? environment.defaultTournament
    //  );
    return +environment.defaultTournament;
  }

  private getActiveRound(): Round | null {
    const activeRound = this.getItem(StorageKeys.ROUND);
    return activeRound ? JSON.parse(activeRound) : null;
  }

  private getTeamSetting(): number | null {
    const team = this.getItem(StorageKeys.TEAM);
    return team ? +team : null;
  }

  private getGameFilters(): GameFilters | null {
    const gameFilters = this.getItem(StorageKeys.GAMEFILTERS);
    return gameFilters ? JSON.parse(gameFilters) : null;
  }

  private setItem(key: StorageKeys, value: string | number | object): void {
    localStorage.setItem(key, value.toString());
  }

  private setOrDeleteItem(
    key: StorageKeys,
    value: string | number | object | null,
  ) {
    if (value === null) {
      this.removeItem(key);
    } else {
      this.setItem(
        key,
        typeof value === 'object' ? JSON.stringify(value) : value,
      );
    }
  }

  private removeItem(key: StorageKeys): void {
    localStorage.removeItem(key);
  }

  public clearAll(): void {
    localStorage.clear();
  }
}
