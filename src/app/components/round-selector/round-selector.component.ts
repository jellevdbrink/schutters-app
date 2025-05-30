import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../../services/settings.service';
import { RoundService } from '../../services/round.service';
import { map, tap } from 'rxjs';
import { Round } from '../../models/round';

@Component({
  selector: 'app-round-selector',
  imports: [CommonModule],
  templateUrl: './round-selector.component.html',
  styleUrl: './round-selector.component.scss',
})
export class RoundSelectorComponent {
  private settingsService = inject(SettingsService);
  private roundService = inject(RoundService);

  public hideGroup = input(false);
  public hideKo = input(false);

  protected rounds$ = this.roundService
    .getRounds(this.settingsService.getTournamentSetting())
    .pipe(
      map((rounds) =>
        rounds.filter((round) => {
          if (this.hideKo() && round.isKo) return false;
          if (this.hideGroup() && !round.isKo) return false;
          return true;
        }),
      ),
      tap((rounds) => {
        // if (!this.forKo() && this.roundService.activeRound() == null) {
        if (this.roundService.activeRound() == null) {
          const lastRound = rounds.at(-1);
          if (lastRound) this.roundService.setActiveRound(lastRound);
        }
      }),
    );

  protected setRound(round: Round): void {
    // if (this.forKo()) {
    // } else {
    this.roundService.setActiveRound(round);
    // }
  }

  protected getRound(): Round | null {
    return this.roundService.activeRound();
  }
}
