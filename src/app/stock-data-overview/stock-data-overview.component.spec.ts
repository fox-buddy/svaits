import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDataOverviewComponent } from './stock-data-overview.component';

describe('StockDataOverviewComponent', () => {
  let component: StockDataOverviewComponent;
  let fixture: ComponentFixture<StockDataOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockDataOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockDataOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
