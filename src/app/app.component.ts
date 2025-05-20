import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome, faBasketball, faNewspaper, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected faHome = faHome;
  protected faBasketball = faBasketball;
  protected faNewspaper = faNewspaper;
  protected faUser = faUser;

  title = 'schutters-app';
}
