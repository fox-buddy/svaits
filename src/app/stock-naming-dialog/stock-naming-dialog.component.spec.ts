import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockNamingDialogComponent } from './stock-naming-dialog.component';

describe('StockNamingDialogComponent', () => {
  let component: StockNamingDialogComponent;
  let fixture: ComponentFixture<StockNamingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockNamingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockNamingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
