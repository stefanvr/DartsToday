import { async, ComponentFixture, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TurnTrackerComponent } from './turn-tracker/turn-tracker.component';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        TurnTrackerComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'DartsToday'`, () => {
    expect(app.title).toEqual('DartsToday');
  });

  it('should render game type', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.game').textContent).toContain('DartsToday');
  });
});
