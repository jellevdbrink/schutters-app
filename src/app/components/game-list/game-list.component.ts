import { Component, computed, input, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';

@Component({
  selector: 'app-game-list',
  imports: [CommonModule],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.scss',
})
export class GameListComponent {
  public games = input.required<Game[]>();
  public sortedGames = computed(() =>
    this.games().sort(
      // TODO fix op een normale manier
      (a, b) =>
        a.start_date.getHours() * 60 +
        a.start_date.getMinutes() -
        (b.start_date.getHours() * 60 + b.start_date.getMinutes()),
    ),
  );

  protected showScoreColumn = computed(() =>
    this.games().some((game) => game.score_1 !== null || game.score_2 !== null),
  );
}
