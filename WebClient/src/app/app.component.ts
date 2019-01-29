import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { IAppState, rootReducer, INITIAL_STATE } from './app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(router: Router, private ngRedux: NgRedux<IAppState>) {
    // Bootstrap 
    ngRedux.configureStore(rootReducer, INITIAL_STATE);
    router.navigate(['/game-center']);
  }
}