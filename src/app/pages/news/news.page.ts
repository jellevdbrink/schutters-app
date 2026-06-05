import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService } from '../../services/news.service';

@Component({
  standalone: true,
  selector: 'app-news',
  imports: [CommonModule],
  templateUrl: './news.page.html',
  styleUrl: './news.page.scss',
})
export class NewsPage {
  private newsService = inject(NewsService);

  protected news$ = this.newsService.getRelevantNews();
}
