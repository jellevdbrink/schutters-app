import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TournamentsPage } from './tournaments.page';

describe('TournamentsComponent', () => {
  let component: TournamentsPage;
  let fixture: ComponentFixture<TournamentsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(TournamentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
