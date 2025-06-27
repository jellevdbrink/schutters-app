import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news',
  imports: [CommonModule],
  templateUrl: './news.page.html',
  styleUrl: './news.page.scss',
})
export class NewsPage {
  private newsService = inject(NewsService);

  protected news$ = this.newsService.getRelevantNews();
}
