import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundService } from '../../services/round.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { switchMap, of } from 'rxjs';
import { RoundSelectorComponent } from '../../components/round-selector/round-selector.component';

@Component({
  selector: 'app-games',
  imports: [CommonModule, RoundSelectorComponent],
  templateUrl: './games.page.html',
  styleUrl: './games.page.scss',
})
export class GamesPage {
  private roundService = inject(RoundService);

  protected games$ = toObservable(this.roundService.groupRoundId).pipe(
    switchMap((roundId) =>
      roundId ? this.roundService.getGames(roundId) : of([]),
    ),
  );
}
