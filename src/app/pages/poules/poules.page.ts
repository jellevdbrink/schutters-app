import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../../services/settings.service';
import { RoundService } from '../../services/round.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { switchMap, of, tap } from 'rxjs';
import { RoundSelectorComponent } from '../../components/round-selector/round-selector.component';

@Component({
  selector: 'app-rounds',
  imports: [CommonModule, RoundSelectorComponent],
  templateUrl: './poules.page.html',
  styleUrl: './poules.page.scss',
})
export class PoulesPage {
  private roundService = inject(RoundService);

  protected poules$ = toObservable(this.roundService.groupRoundId).pipe(
    switchMap((roundId) =>
      roundId ? this.roundService.getPoules(roundId) : of([]),
    ),
  );
}
