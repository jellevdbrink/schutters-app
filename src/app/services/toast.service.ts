import { Injectable } from '@angular/core';

export interface Toast {
	text: string;
	classname?: string;
	delay?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts: Toast[] = [];

  public getToasts(): Toast[] {
    return this.toasts;
  }

	public show(toast: Toast): void {
		this.toasts.push(toast);
	}

	public remove(toast: Toast): void {
		this.toasts = this.toasts.filter((t) => t !== toast);
	}

	public clear(): void {
		this.toasts.splice(0, this.toasts.length);
	}
}
