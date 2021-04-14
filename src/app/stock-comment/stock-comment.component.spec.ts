import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockCommentComponent } from './stock-comment.component';

describe('StockCommentComponent', () => {
  let component: StockCommentComponent;
  let fixture: ComponentFixture<StockCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
