import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import type { WP_REST_API_Posts, WP_REST_API_Post } from 'wp-types';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private http = inject(HttpClient);
  private settingsService = inject(SettingsService);

  constructor() {}

  public getNews() {
    return this.http.get<WP_REST_API_Posts>(
      'https://schutterstoernooi.nl/wp-json/wp/v2/posts?_embed',
    );
  }

  public getNewsItem(item: number) {
    return this.http.get<WP_REST_API_Post>(
      `https://schutterstoernooi.nl/wp-json/wp/v2/posts/${item}?_embed`,
    );
  }

  public getRelevantNews() {
    return this.getNews().pipe(
      map((news) =>
        news.filter((newsItem) => ![2661, 2708, 2718].includes(newsItem.id)),
      ),
      tap(() => this.settingsService.isLoading.set(false)),
    );
  }
}
