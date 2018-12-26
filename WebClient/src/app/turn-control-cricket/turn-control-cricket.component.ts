import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-turn-control-cricket',
  templateUrl: './turn-control-cricket.component.html',
  styleUrls: ['./turn-control-cricket.component.scss']
})
export class TurnControlCricketComponent {
  reset() {
    console.log('reset');
  }

  done() {
    console.log('done');
  }

  hitSingle(value) {
    console.log('single: ' + value);
  }

  hitDubble(value) {
    console.log('dubble: ' + value);
  }

  hitTriple(value) {
    console.log('triple: ' + value);
  }

  

}
