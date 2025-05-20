import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Tournament } from '../../models/tournament';
import { Router, RouterLink } from '@angular/router';
import { TournamentService } from '../../services/tournament.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tournaments',
  imports: [CommonModule, AsyncPipe, RouterLink],
  templateUrl: './tournaments.page.html',
  styleUrl: './tournaments.page.scss',
})
export class TournamentsPage {
  private router = inject(Router);
  private tournamentService = inject(TournamentService);

  protected tournaments$ = this.tournamentService
    .getTournaments()
    .pipe(
      map((tournaments) =>
        tournaments.sort(
          (a, b) => a.event_date.getTime() - b.event_date.getTime(),
        ),
      ),
    );

  protected setTournament(tournament: Tournament): void {
    this.router.navigate(['tournooi', tournament.id]);
  }
}
