import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPlayersComponent } from './select-players.component';
import { GameConfiguratieState } from 'src/app/DartsToday/GameConfiguration';

describe('SelectPlayersComponent', () => {
  let component: SelectPlayersComponent;
  let fixture: ComponentFixture<SelectPlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPlayersComponent);
    component = fixture.componentInstance;
    component.gameConfig = new GameConfiguratieState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
