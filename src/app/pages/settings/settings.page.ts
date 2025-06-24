import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { TournamentService } from '../../services/tournament.service';
import { SettingsService } from '../../services/settings.service';
import { TeamsService } from '../../services/teams.service';
import { ToastService } from '../../services/toast.service';

type SettingsForm = FormGroup<{
  tournament: FormControl<number>;
  team: FormControl<number | null>;
}>;

@Component({
  selector: 'app-settings',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './settings.page.html',
  styleUrl: './settings.page.scss',
})
export class SettingsPage {
  private tournamentService = inject(TournamentService);
  private teamService = inject(TeamsService);
  private settingsService = inject(SettingsService);
  private toastService = inject(ToastService);

  protected tournaments$ = this.tournamentService.getTournaments();
  protected teams$ = this.teamService.getTeams();

  protected settingsForm: SettingsForm = new FormGroup({
    tournament: new FormControl(this.settingsService.activeTournament(), {
      nonNullable: true,
    }),
    team: new FormControl(this.settingsService.myTeam(), {
      nonNullable: true,
    }),
  });

  protected saveSettingsForm() {
    const formValue = this.settingsForm.getRawValue();

    this.settingsService.activeTournament.set(formValue.tournament);
    this.settingsService.myTeam.set(formValue.team)

    this.toastService.show({
      text: 'Instellingen opgeslagen',
      classname: 'bg-success text-light',
    });
  }
}
