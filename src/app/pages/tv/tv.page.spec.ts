import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TvPage } from './tv.page';

describe('TvPage', () => {
  let component: TvPage;
  let fixture: ComponentFixture<TvPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvPage],
    }).compileComponents();

    fixture = TestBed.createComponent(TvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
