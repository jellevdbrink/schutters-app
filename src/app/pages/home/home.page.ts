import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundService } from '../../services/round.service';
import { of, switchMap } from 'rxjs';
import { SettingsService } from '../../services/settings.service';
import { PouleComponent } from '../../components/poule/poule.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TeamsService } from '../../services/teams.service';
import { ToastService } from '../../services/toast.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { TournamentService } from '../../services/tournament.service';
import { GameListComponent } from '../../components/game-list/game-list.component';
import { NewsService } from '../../services/news.service';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PouleComponent,
    GameListComponent,
    NgbCarouselModule,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {
  private roundService = inject(RoundService);
  private settingsService = inject(SettingsService);
  private teamsService = inject(TeamsService);
  private tournamentService = inject(TournamentService);
  private toastService = inject(ToastService);
  private newsService = inject(NewsService);

  protected teamControl = new FormControl(this.settingsService.myTeam(), {
    nonNullable: true,
  });

  protected teams$ = this.teamsService.getTeams();
  protected news$ = this.newsService.getRelevantNews();

  protected latestMyPoule$ = toObservable(this.settingsService.myTeam).pipe(
    switchMap((myTeamId) =>
      myTeamId ? this.roundService.getLatestPoule(myTeamId) : of(undefined),
    ),
  );
  protected myGames$ = toObservable(this.settingsService.myTeam).pipe(
    switchMap((myTeamId) =>
      myTeamId
        ? this.tournamentService.getGamesByTeam(myTeamId)
        : of(undefined),
    ),
  );

  protected onTeamChange(): void {
    const newTeam = this.teamControl.getRawValue();
    this.settingsService.myTeam.set(newTeam);

    this.toastService.show({
      text: 'Nieuw team opgeslagen',
      classname: 'bg-success text-light',
    });
  }
}
