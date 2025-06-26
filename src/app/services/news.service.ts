import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { WP_REST_API_Posts, WP_REST_API_Post } from 'wp-types';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private http = inject(HttpClient);

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
}
