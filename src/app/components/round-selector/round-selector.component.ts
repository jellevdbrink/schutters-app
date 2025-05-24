import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../../services/settings.service';
import { RoundService } from '../../services/round.service';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-round-selector',
  imports: [CommonModule],
  templateUrl: './round-selector.component.html',
  styleUrl: './round-selector.component.scss',
})
export class RoundSelectorComponent {
  private settingsService = inject(SettingsService);
  private roundService = inject(RoundService);

  public forKo = input.required<boolean>();

  protected rounds$ = this.roundService
    .getRounds(this.settingsService.getTournamentSetting())
    .pipe(
      map((rounds) => {
        if (this.forKo()) {
          return rounds.filter((round) => round.isKo);
        }
        return rounds.filter((round) => !round.isKo);
      }),
      tap((rounds) => {
        if (!this.forKo() && this.roundService.groupRoundId() == null) {
          const lastRound = rounds.at(-1);
          if (lastRound) this.roundService.setGroupRoundId(lastRound.id);
        }
      }),
    );

  protected setRound(roundId: number): void {
    if (this.forKo()) {
    } else {
      this.roundService.setGroupRoundId(roundId);
    }
  }

  protected getRound(): number | null {
    return this.roundService.groupRoundId();
  }
}
