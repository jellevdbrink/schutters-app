import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Form,
} from '@angular/forms';
import { TournamentService } from '../../services/tournament.service';
import { SettingsService, StorageKeys } from '../../services/settings.service';
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
  protected teams$ = this.teamService.getTeams(
    this.settingsService.getTournamentSetting(),
  );

  protected settingsForm: SettingsForm = new FormGroup({
    tournament: new FormControl(this.settingsService.getTournamentSetting(), {
      nonNullable: true,
    }),
    team: new FormControl(this.settingsService.getTeamSetting(), {
      nonNullable: true,
    }),
  });

  protected saveSettingsForm() {
    const formValue = this.settingsForm.getRawValue();
    this.settingsService.setItem(
      StorageKeys.TOURNAMENT,
      formValue.tournament.toString(),
    );

    if (formValue.team === null) {
      this.settingsService.removeItem(StorageKeys.TEAM);
    } else {
      this.settingsService.setItem(StorageKeys.TEAM, formValue.team.toString());
    }

    this.toastService.show({
      text: 'Instellingen opgeslagen',
      classname: 'bg-success text-light',
    });
  }
}
