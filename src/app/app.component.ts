import { Component } from '@angular/core';
import { BasketballRecord } from './basketball.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LCSD Leisure Link - Searching';
  updateEventTriggered: boolean = false;
  deleteEventTriggered: boolean = false;
  createEventTriggered: boolean = false;
  basketRecord!:BasketballRecord;

  updateEventReceiver(basketRecord:BasketballRecord) {
    this.basketRecord = basketRecord;
    this.updateEventTriggered = true;
  }

  deleteEventReceiver(basketRecord:BasketballRecord) {
    this.basketRecord = basketRecord;
    this.deleteEventTriggered = true;
  }

  createEventReceiver() {
    console.log("App: createEvent received");
    this.createEventTriggered = true;
  }

  cancelDeleteEventReceiver() {
    console.log("App: cancelDeleteEvent received");
    this.deleteEventTriggered = false;
  }

  cancelUpdateEventReceiver() {
    console.log("App: cancelDeleteEvent received");
    this.updateEventTriggered = false;
  }

  cancelCreateEventReceiver() {
    console.log("App: cancelCreateEvent received");
    this.createEventTriggered = false;
  }

}
