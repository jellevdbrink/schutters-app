import { inject } from '@angular/core';
import { HttpRequest, HttpEvent, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SettingsService } from '../services/settings.service';

export function loadingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const settingsService = inject(SettingsService);

  settingsService.isLoading.set(true);

  return next(req).pipe(finalize(() => settingsService.isLoading.set(false)));
}
