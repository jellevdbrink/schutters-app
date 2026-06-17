import { Component, inject, input, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundService } from '../../services/round.service';
import { map, tap } from 'rxjs';
import { Round } from '../../models/round';

@Component({
  standalone: true,
  selector: 'app-round-selector',
  imports: [CommonModule],
  templateUrl: './round-selector.component.html',
  styleUrl: './round-selector.component.scss',
})
export class RoundSelectorComponent {
  private roundService = inject(RoundService);

  public hideGroup = input(false);
  public hideKo = input(false);

  public activeRound = input.required<WritableSignal<Round | null>>();

  protected rounds$ = this.roundService.getRounds().pipe(
    map((rounds) =>
      rounds.filter((round) => {
        if (this.hideKo() && round.isKo) return false;
        if (this.hideGroup() && !round.isKo) return false;
        return true;
      }),
    ),
    tap((rounds) => {
      // if (!this.forKo() && this.roundService.activeRound() == null) {
      if (this.activeRound()() == null) {
        const lastRound = rounds.at(-1);
        if (lastRound) this.activeRound().set(lastRound);
      }
    }),
  );
}
