import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundService } from '../../services/round.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { switchMap, of, filter } from 'rxjs';
import { RoundSelectorComponent } from '../../components/round-selector/round-selector.component';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilterModalComponent } from './filter-modal/filter-modal.component';
import { GameOverviewComponent } from './game-overview/game-overview.component';
import { SettingsService } from '../../services/settings.service';
import { Round } from '../../models/round';

@Component({
  standalone: true,
  selector: 'app-games',
  imports: [
    CommonModule,
    FontAwesomeModule,
    RoundSelectorComponent,
    GameOverviewComponent,
  ],
  templateUrl: './games.page.html',
  styleUrl: './games.page.scss',
})
export class GamesPage {
  private roundService = inject(RoundService);
  private settingsService = inject(SettingsService);
  private modalService = inject(NgbModal);

  protected faFilter = faFilter;
  protected activeRound = signal<Round | null>(this.settingsService.getActiveRound('games'));

  constructor() {
    effect(() => this.settingsService.setOrDeleteActiveRound('games', this.activeRound()))
  }

  protected games$ = toObservable(this.activeRound).pipe(
    filter(Boolean),
    switchMap((round) =>
      this.roundService.getGames(round.id)
    ),
  );

  protected openFilterModal(): void {
    this.modalService.open(FilterModalComponent, { centered: true });
  }
}
