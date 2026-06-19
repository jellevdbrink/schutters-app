import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  selector: 'app-sponsor-video',
  imports: [],
  templateUrl: './sponsor-video.component.html',
  styleUrl: './sponsor-video.component.scss'
})
export class SponsorVideoComponent implements AfterViewInit {
  private activeModal = inject(NgbActiveModal);

  @ViewChild('video') video?: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    const player = this.video?.nativeElement;
    if (player) {
      player.muted = true;
      player.play();
    }
  }

  protected close(): void {
    this.activeModal.close();
  }
}
