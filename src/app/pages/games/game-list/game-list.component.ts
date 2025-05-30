import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../../models/game';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, take, tap } from 'rxjs';

@Component({
  selector: 'app-game-list',
  imports: [CommonModule],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.scss',
})
export class GameListComponent {
  public gameSeries = input.required<Game[][]>();

  protected activePlayingRound = signal<number>(1);

  constructor() {
    toObservable(this.gameSeries)
      .pipe(
        filter((gs) => !!gs.length),
        take(1),
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
}
