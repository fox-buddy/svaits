import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDataCalcDetailComponent } from './stock-data-calc-detail.component';

describe('StockDataCalcDetailComponent', () => {
  let component: StockDataCalcDetailComponent;
  let fixture: ComponentFixture<StockDataCalcDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockDataCalcDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockDataCalcDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
