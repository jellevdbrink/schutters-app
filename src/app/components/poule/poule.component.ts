import { Component, input } from '@angular/core';

import { Poule } from '../../models/ranking';

@Component({
  selector: 'app-poule',
  imports: [],
  templateUrl: './poule.component.html',
  styleUrl: './poule.component.scss',
})
export class PouleComponent {
  public poule = input.required<Poule>();
}
