import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundService } from '../../services/round.service';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { switchMap, of, tap, map, filter, combineLatest } from 'rxjs';
import { RoundSelectorComponent } from '../../components/round-selector/round-selector.component';
import { PouleComponent } from '../../components/poule/poule.component';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-rounds',
  imports: [CommonModule, RoundSelectorComponent, PouleComponent],
  templateUrl: './poules.page.html',
  styleUrl: './poules.page.scss',
})
export class PoulesPage {
  private roundService = inject(RoundService);
  private settingsService = inject(SettingsService);

  protected poules$ = toObservable(this.settingsService.activeRound).pipe(
    filter(Boolean),
    tap((round) => round.isKo && this.settingsService.activeRound.set(null)),
    switchMap((round) => this.roundService.getPoules(round.id)),
  );

  protected myPoule$ = combineLatest([this.poules$, toObservable(this.settingsService.myTeam)]).pipe(
    map(([poules, myTeam]) => {
      return myTeam
        ? poules.find((poule) =>
            poule.ranking.some(
              (rankingEntry) => rankingEntry.team.id == myTeam,
            ),
          )
        : undefined;
    }),
  );
}
