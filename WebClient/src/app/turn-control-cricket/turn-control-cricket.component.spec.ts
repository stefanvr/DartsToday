import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnControlCricketComponent } from './turn-control-cricket.component';

describe('TurnControlCricketComponent', () => {
  let component: TurnControlCricketComponent;
  let fixture: ComponentFixture<TurnControlCricketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnControlCricketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnControlCricketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
