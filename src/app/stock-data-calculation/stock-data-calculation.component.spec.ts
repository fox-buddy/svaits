import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDataCalculationComponent } from './stock-data-calculation.component';

describe('StockDataCalculationComponent', () => {
  let component: StockDataCalculationComponent;
  let fixture: ComponentFixture<StockDataCalculationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockDataCalculationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockDataCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
