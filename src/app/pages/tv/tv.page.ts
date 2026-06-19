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
import { firstValueFrom, interval, Observable } from 'rxjs';
import { Poule } from '../../models/ranking';
import { Title } from '@angular/platform-browser';
import { Game, KOGame } from '../../models/game';
import { PouleComponent } from '../../components/poule/poule.component';
import { GameListComponent } from '../../components/game-list/game-list.component';
import { getKoRoundName } from '../../../helpers';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type Slide = {
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
    );

@Component({
  standalone: true,
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

  @ViewChild('infoCarousel', { static: true }) protected infoCarousel?: NgbCarousel;
  @ViewChild('sponsorCarousel', { static: true }) protected sponsorCarousel?: NgbCarousel;
  protected poules: Signal<Poule[][]> = signal([]);

  constructor() {
    const slideInterval = 10 * 1000;
    interval(slideInterval).pipe(takeUntilDestroyed()).subscribe(() => {
      this.infoCarousel?.next();
      this.sponsorCarousel?.next();
    })
  }

  public ngOnInit(): void {
    this.updateInfoSlides();
    this.tournament$.subscribe((tournament) =>
      this.titleService.setTitle(tournament.name),
    );
  }

  protected onInfoSlid(slideEvent: NgbSlideEvent): void {
    if (slideEvent.current === `info-slide-${this.slides.length - 1}`) {
      this.updateInfoSlides();
    }
  }

  private async updateInfoSlides(): Promise<void> {
    let rounds = await firstValueFrom(this.roundService.getRounds());
    if (rounds.length > 1) {
      rounds = rounds.slice(-2);
    }

    const newSlides: Slide[] = [];
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
          newSlides.push({
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
          newSlides.push({
            roundName: `${round.name} - ${getKoRoundName(gameSeries[0].length, roundNumber - 1)}`,
            isKo: true,
            games: gameSeries.at(gamesToShowIndex - 1) ?? [], // Geen hele nette ?? []
          });
        }

        newSlides.push({
          roundName: `${round.name} - ${getKoRoundName(gameSeries[0].length, roundNumber)}`,
          isKo: true,
          games: gameSeries.at(gamesToShowIndex) ?? [], // Geen hele nette ?? []
        });
      }

      if (iteration == rounds.length - 1) {
        this.slides = newSlides;
      }
    });
  }
}
