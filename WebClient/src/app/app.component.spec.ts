import { async, ComponentFixture, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TurnTrackerComponent } from './turn-tracker/turn-tracker.component';
import { TurnControlCricketComponent } from './turn-control-cricket/turn-control-cricket.component';


describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        TurnTrackerComponent,
        TurnControlCricketComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'DartsToday'`, () => {
    expect(app.title).toEqual('DartsToday');
  });

  it('should render game type', () => {
    expect(compiled.querySelector('#header').textContent).toContain('DartsToday');
  });

  it('should render turn tracker', () => {
    expect(compiled.querySelector('app-turn-tracker')).toBeTruthy();
  });

  it('should render turn control ticket', () => {
    expect(compiled.querySelector('app-turn-control-cricket')).toBeTruthy();
  });
});
