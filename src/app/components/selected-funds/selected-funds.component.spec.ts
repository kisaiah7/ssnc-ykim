import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedFundsComponent } from './selected-funds.component';

describe('SelectedFundsComponent', () => {
  let component: SelectedFundsComponent;
  let fixture: ComponentFixture<SelectedFundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedFundsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedFundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
