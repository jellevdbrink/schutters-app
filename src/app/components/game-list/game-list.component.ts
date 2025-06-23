import { Component, computed, input } from '@angular/core';
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

  protected showScoreColumn = computed(() =>
    this.games().some((game) => game.score_1 !== null || game.score_2 !== null),
  );
}
