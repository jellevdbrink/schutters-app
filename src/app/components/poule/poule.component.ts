import { Component, input } from '@angular/core';

import { Poule } from '../../models/ranking';

@Component({
  standalone: true,
  selector: 'app-poule',
  imports: [],
  templateUrl: './poule.component.html',
  styleUrl: './poule.component.scss',
})
export class PouleComponent {
  public poule = input.required<Poule>();
  public highlight = input(false);
  public showField = input(true);
}
