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

  settingsService.numLoading.set(settingsService.numLoading() + 1);

  return next(req).pipe(
    finalize(() =>
      settingsService.numLoading.set(settingsService.numLoading() - 1),
    ),
  );
}
