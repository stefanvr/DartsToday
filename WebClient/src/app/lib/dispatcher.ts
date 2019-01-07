import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })
export class Dispatcher {
    private onEvent: EventEmitter<any> = new EventEmitter();
        
    subscibe(handler) {
      return this.onEvent.subscribe(handler);
    }

    publish(event) {
        this.onEvent.emit(event);
    }
}