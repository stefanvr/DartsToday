import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureGameComponent } from './configure-game.component';
import { GameConfiguratieState } from 'src/app/DartsToday/GameConfiguration';

describe('ConfigureGameComponent', () => {
  let component: ConfigureGameComponent;
  let fixture: ComponentFixture<ConfigureGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureGameComponent);
    component = fixture.componentInstance;
    component.gameConfig = new GameConfiguratieState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
