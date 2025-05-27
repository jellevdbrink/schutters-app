import { Component, inject } from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from './services/toast.service';

@Component({
	selector: 'app-toasts',
	imports: [NgbToastModule],
	template: `
		@for (toast of toastService.getToasts(); track toast) {
			<ngb-toast
				[class]="toast.classname"
				[autohide]="true"
				[delay]="toast.delay || 5000"
				(hidden)="toastService.remove(toast)"
			>
				{{ toast.text }}
			</ngb-toast>
		}
	`,
	host: { class: 'toast-container position-fixed bottom-0 end-0 p-3', style: 'z-index: 1200; margin-bottom: 60px;' },
})
export class ToastsContainer {
	toastService = inject(ToastService);
}
