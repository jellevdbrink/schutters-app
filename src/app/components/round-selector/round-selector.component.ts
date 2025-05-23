import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../../services/settings.service';
import { RoundService } from '../../services/round.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-round-selector',
  imports: [CommonModule],
  templateUrl: './round-selector.component.html',
  styleUrl: './round-selector.component.scss',
})
export class RoundSelectorComponent {
  private settingsService = inject(SettingsService);
  private roundService = inject(RoundService);

  protected rounds$ = this.roundService
    .getRounds(this.settingsService.getTournamentSetting())
    .pipe(
      tap((rounds) => {
        if (this.roundService.groupRoundId() == null) {
          const lastRound = rounds.at(-1);
          if (lastRound) this.roundService.setGroupRoundId(lastRound.id);
        }
      }),
    );

  protected setRound(roundId: number): void {
    this.roundService.setGroupRoundId(roundId);
  }
}
