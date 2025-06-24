import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SettingsService, StorageKeys } from '../../../services/settings.service';
import { FormOf } from '../../../../helpers';

export type GameFilters = {
  showPastGames: boolean;
  showFutureGames: boolean;
}

@Component({
  selector: 'app-filter-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './filter-modal.component.html',
  styleUrl: './filter-modal.component.scss',
})
export class FilterModalComponent {
  private activeModal = inject(NgbActiveModal);
  private settingsService = inject(SettingsService);

  protected filterForm: FormOf<GameFilters> = new FormGroup({
    showPastGames: new FormControl(this.settingsService.gameFilters()?.showPastGames ?? true, { nonNullable: true }),
    showFutureGames: new FormControl(this.settingsService.gameFilters()?.showFutureGames ?? true, { nonNullable: true }),
  });

  protected save(): void {
    this.settingsService.gameFilters.set(this.filterForm.getRawValue());
    this.close();
  }

  protected close(): void {
    this.activeModal.close();
  }
}
