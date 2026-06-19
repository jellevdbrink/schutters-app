import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SponsorVideoComponent } from './sponsor-video.component';

describe('SponsorVideoComponent', () => {
  let component: SponsorVideoComponent;
  let fixture: ComponentFixture<SponsorVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SponsorVideoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SponsorVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
