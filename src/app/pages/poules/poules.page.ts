import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../../services/settings.service';
import { RoundService } from '../../services/round.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { switchMap, of, tap } from 'rxjs';

@Component({
  selector: 'app-rounds',
  imports: [CommonModule],
  templateUrl: './poules.page.html',
  styleUrl: './poules.page.scss',
})
export class PoulesPage {
  private settingsService = inject(SettingsService);
  private roundService = inject(RoundService);

  protected showGames = signal(false);

  protected rounds$ = this.roundService.getRounds(this.settingsService.getTournamentSetting()).pipe(
    tap((rounds) => {
      if (this.roundService.groupRoundId() == null) {
        const lastRound = rounds.at(-1);
        if (lastRound) this.roundService.setGroupRoundId(lastRound.id);
      }
    }),
  );

  protected poules$ = toObservable(this.roundService.groupRoundId).pipe(
    switchMap((roundId) =>
      roundId ? this.roundService.getPoules(roundId) : of([]),
    ),
  );

  protected games$ = toObservable(this.roundService.groupRoundId).pipe(
    switchMap((roundId) => roundId ? this.roundService.getGames(roundId) : of([]))
  )

  protected setRound(roundId: number): void {
    this.roundService.setGroupRoundId(roundId);
  }
}
