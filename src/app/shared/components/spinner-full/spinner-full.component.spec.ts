import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerFullComponent } from './spinner-full.component';

describe('SppinerFullComponent', () => {
  let component: SpinnerFullComponent;
  let fixture: ComponentFixture<SpinnerFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnerFullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
