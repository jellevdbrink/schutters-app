import {
  Component,
  inject,
  OnInit,
  resource,
  signal,
  Signal,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../../services/settings.service';
import { TournamentService } from '../../services/tournament.service';
import {
  NgbCarousel,
  NgbCarouselModule,
  NgbSlideEvent,
} from '@ng-bootstrap/ng-bootstrap';
import { RoundService } from '../../services/round.service';
import { firstValueFrom, Observable } from 'rxjs';
import { Poule } from '../../models/ranking';
import { Title } from '@angular/platform-browser';
import { Game, KOGame } from '../../models/game';
import { PouleComponent } from '../../components/poule/poule.component';
import { GameListComponent } from '../../components/game-list/game-list.component';
import { getKoRoundName } from '../../../helpers';

type Slide =
  | ({
      roundName: string;
    } & (
      | {
          isKo: false;
          poules: Poule[];
        }
      | {
          isKo: true;
          games: Game[];
        }
    ))
  | 'ss2';

@Component({
  selector: 'app-tv',
  imports: [CommonModule, NgbCarouselModule, PouleComponent, GameListComponent],
  templateUrl: './tv.page.html',
  styleUrl: './tv.page.scss',
})
export class TvPage implements OnInit {
  private settingsService = inject(SettingsService);
  private roundService = inject(RoundService);
  private tournamentService = inject(TournamentService);
  private titleService = inject(Title);

  protected tournament$ = this.tournamentService.getTournament(
    this.settingsService.activeTournament(),
  );
  protected slides: Slide[] = [];

  @ViewChild('carousel', { static: true }) protected carousel?: NgbCarousel;
  protected poules: Signal<Poule[][]> = signal([]);

  public ngOnInit(): void {
    this.updateSlides();
    this.tournament$.subscribe((tournament) =>
      this.titleService.setTitle(tournament.name),
    );
  }

  protected onSlide(slideEvent: NgbSlideEvent): void {
    if (slideEvent.current === 'sponsor-slide') {
      this.updateSlides();
    }
  }

  private async updateSlides(): Promise<void> {
    let rounds = await firstValueFrom(this.roundService.getRounds());
    if (rounds.length > 1) {
      rounds = rounds.slice(-2);
    }

    this.slides = [];
    rounds.forEach(async (round, iteration) => {
      if (!round.isKo) {
        const poules = await firstValueFrom(
          this.roundService.getPoules(round.id),
        );

        const numPoulesOnScreen = 4;
        const pouleSlides: Poule[][] = [];
        for (let i = 0; i < poules.length; i += numPoulesOnScreen) {
          pouleSlides.push(poules.slice(i, i + numPoulesOnScreen));
        }

        for (const pouleSlide of pouleSlides) {
          this.slides.push({
            roundName: round.name,
            isKo: false,
            poules: pouleSlide,
          });
        }
      } else {
        const gameSeries = await firstValueFrom(
          this.roundService.getGames<KOGame>(round.id),
        );

        let gamesToShowIndex = gameSeries.findIndex((games) =>
          games.every((game) => game.score_1 === null && game.score_2 === null),
        );
        const roundNumber = gamesToShowIndex + 1;

        if (gamesToShowIndex !== 0) {
          this.slides.push({
            roundName: `${round.name} - ${getKoRoundName(gameSeries[0].length, roundNumber - 1)}`,
            isKo: true,
            games: gameSeries.at(gamesToShowIndex - 1) ?? [], // Geen hele nette ?? []
          });
        }

        this.slides.push({
          roundName: `${round.name} - ${getKoRoundName(gameSeries[0].length, roundNumber)}`,
          isKo: true,
          games: gameSeries.at(gamesToShowIndex) ?? [], // Geen hele nette ?? []
        });
      }
      if (iteration == 0) {
        this.slides.push('ss2');
      }
    });
  }
}
