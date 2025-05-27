import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Poule } from '../../models/ranking';

@Component({
  selector: 'app-poule',
  imports: [CommonModule],
  templateUrl: './poule.component.html',
  styleUrl: './poule.component.scss',
})
export class PouleComponent {
  public poule = input.required<Poule>();
}
