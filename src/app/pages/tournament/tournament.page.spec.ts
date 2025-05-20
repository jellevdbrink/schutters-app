import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TournamentPage } from './tournament.page';

describe('TournamentComponent', () => {
  let component: TournamentPage;
  let fixture: ComponentFixture<TournamentPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentPage],
    }).compileComponents();

    fixture = TestBed.createComponent(TournamentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
