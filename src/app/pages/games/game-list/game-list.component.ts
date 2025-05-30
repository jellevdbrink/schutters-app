import { Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game, KOGame } from '../../../models/game';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { filter, tap } from 'rxjs';

@Component({
  selector: 'app-game-list',
  imports: [CommonModule],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.scss',
})
export class GameListComponent {
  public gameSeries = input.required<(Game | KOGame)[][]>();
  public koRoundNaming = input(false);

  protected activePlayingRound = signal<number>(1);

  constructor() {
    toObservable(this.gameSeries)
      .pipe(
        takeUntilDestroyed(),
        filter((gs) => !!gs.length),
        tap((gameSeries) => {
          const index = gameSeries.findIndex((games) =>
            games.every(
              (game) => game.score_1 === null && game.score_2 === null,
            ),
          );
          if (index >= 0) {
            this.activePlayingRound.set(index + 1);
          }
        }),
      )
      .subscribe();
  }

  protected playingRoundIds = computed(() =>
    this.gameSeries().map((games, index) => index + 1),
  );

  protected selectedGames = computed(
    () => this.gameSeries()[this.activePlayingRound() - 1],
  );

  protected showScoreColumn = computed(() =>
    this.selectedGames()?.some(
      (game) => game.score_1 !== null || game.score_2 !== null,
    ),
  );

  protected getKoRoundName(roundNumber: number) {
    const num = this.gameSeries()[0].length / 2 ** (roundNumber - 1);
    return num === 1 ? `Finale` : `1/${num} finale`;
  }

  protected isUndefinedPlayingRound(roundNumber: number) {
    return this.gameSeries()[roundNumber - 1].some(
      (round) => round.team1 === null || round.team2 === null,
    );
  }
}
