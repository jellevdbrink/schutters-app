import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PoulesPage } from './poules.page';

describe('PoulesComponent', () => {
  let component: PoulesPage;
  let fixture: ComponentFixture<PoulesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoulesPage],
    }).compileComponents();

    fixture = TestBed.createComponent(PoulesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
