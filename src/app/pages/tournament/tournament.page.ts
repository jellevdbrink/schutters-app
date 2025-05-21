import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentService } from '../../services/tournament.service';
import { Tournament } from '../../models/tournament';
import { Observable } from 'rxjs';
import { RoundService } from '../../services/round.service';
import { Round } from '../../models/round';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-tournament',
  imports: [CommonModule],
  templateUrl: './tournament.page.html',
  styleUrl: './tournament.page.scss',
})
export class TournamentPage {
  private tournamentService = inject(TournamentService);
  private roundService = inject(RoundService);
  private settingsService = inject(SettingsService);

  protected tournament$!: Observable<Tournament>;
  protected rounds$!: Observable<Round[]>

  @Input({ required: true })
  set tournamentId(tournamentId: number | undefined) {
    if (!tournamentId) {
      tournamentId = +this.settingsService.getTournamentSetting();
    }
    this.tournament$ = this.tournamentService.getTournament(tournamentId);
    this.rounds$ = this.roundService.getRounds(tournamentId);
  }
}
