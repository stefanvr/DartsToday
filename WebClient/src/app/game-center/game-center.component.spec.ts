import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { GameCenterComponent } from './game-center.component';

import { GameService } from '../services/game.service'

describe('GameCenterComponent', () => {
  let component: GameCenterComponent;
  let fixture: ComponentFixture<GameCenterComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ 
        GameCenterComponent
     ],
     providers: [GameService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCenterComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
