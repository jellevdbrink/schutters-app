import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundService } from '../../services/round.service';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { switchMap, of, tap, map, filter } from 'rxjs';
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

  protected poules$ = toObservable(this.roundService.activeRound).pipe(
    filter(Boolean),
    tap((round) => round.isKo && this.roundService.setActiveRound(null)),
    switchMap((round) => this.roundService.getPoules(round.id)),
  );

  protected myPoule$ = this.poules$.pipe(
    map((poules) => {
      const myPouleId = this.settingsService.getTeamSetting();
      return myPouleId
        ? poules.find((poule) =>
            poule.ranking.some(
              (rankingEntry) => rankingEntry.team.id == myPouleId,
            ),
          )
        : undefined;
    }),
  );
}
