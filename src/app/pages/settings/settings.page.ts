import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { TournamentService } from '../../services/tournament.service';
import { SettingsService, StorageKeys } from '../../services/settings.service';

type SettingsForm = FormGroup<{
  tournament: FormControl<string>;
}>;

@Component({
  selector: 'app-settings',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './settings.page.html',
  styleUrl: './settings.page.scss',
})
export class SettingsPage {
  private tournamentService = inject(TournamentService);
  private settingsService = inject(SettingsService);

  protected tournaments$ = this.tournamentService.getTournaments();
  protected settingsForm: SettingsForm = new FormGroup({
    tournament: new FormControl(
      `${this.settingsService.getTournamentSetting()}`,
      { nonNullable: true },
    ),
  });

  protected saveSettingsForm() {
    const formValue = this.settingsForm.getRawValue();
    this.settingsService.setItem(StorageKeys.TOURNAMENT, formValue.tournament);
  }
}
