import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundService } from '../../services/round.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { switchMap, map, filter, combineLatest, startWith } from 'rxjs';
import { RoundSelectorComponent } from '../../components/round-selector/round-selector.component';
import { PouleComponent } from '../../components/poule/poule.component';
import { SettingsService } from '../../services/settings.service';
import { Round } from '../../models/round';

@Component({
  standalone: true,
  selector: 'app-rounds',
  imports: [CommonModule, RoundSelectorComponent, PouleComponent],
  templateUrl: './poules.page.html',
  styleUrl: './poules.page.scss',
})
export class PoulesPage {
  private roundService = inject(RoundService);
  private settingsService = inject(SettingsService);

  protected activeRound = signal<Round | null>(this.settingsService.getActiveRound('poules'));

  constructor() {
    effect(() => this.settingsService.setOrDeleteActiveRound('poules', this.activeRound()));
  }

  protected poules$ = toObservable(this.activeRound).pipe(
    filter(Boolean),
    switchMap((round) => this.roundService.getPoules(round.id).pipe(startWith(null))),
  );

  protected myPoule$ = combineLatest([this.poules$, toObservable(this.settingsService.myTeam)]).pipe(
    map(([poules, myTeam]) => {
      return myTeam && poules
        ? poules.find((poule) =>
            poule.ranking.some(
              (rankingEntry) => rankingEntry.team.id == myTeam,
            ),
          )
        : undefined;
    }),
  );
}
