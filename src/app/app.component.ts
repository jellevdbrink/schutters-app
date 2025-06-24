import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faHome,
  faUserGroup,
  faTrophy,
  faSliders,
  faCalendar,
} from '@fortawesome/free-solid-svg-icons';
import { TournamentService } from './services/tournament.service';
import { SettingsService } from './services/settings.service';
import { Title } from '@angular/platform-browser';
import { ToastsContainer } from './toasts-container.component';
import { Location } from '@angular/common';
// import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FontAwesomeModule,
    ToastsContainer,
    // AsyncPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private tournamentService = inject(TournamentService);
  private settingsService = inject(SettingsService);
  private titleService = inject(Title);
  private location = inject(Location);

  protected faHome = faHome;
  protected faUserGroup = faUserGroup;
  protected faTrophy = faTrophy;
  protected faSliders = faSliders;
  protected faCalendar = faCalendar;

  protected tournament$ = this.tournamentService.getTournament(
    this.settingsService.activeTournament(),
  );

  protected getTitle(): string {
    return this.titleService.getTitle();
  }

  protected showNav() {
    return !['/geduld', '/tv'].includes(this.location.path());
  }
}
