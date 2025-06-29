import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WaitPage } from './wait.page';

describe('WaitPage', () => {
  let component: WaitPage;
  let fixture: ComponentFixture<WaitPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaitPage],
    }).compileComponents();

    fixture = TestBed.createComponent(WaitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
