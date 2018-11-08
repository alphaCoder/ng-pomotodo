import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../models/todo';
import 'ion-sound';
declare var ion: any;

@Component({
  selector: 'pomodoro-app',
  styleUrls: ['./pomodoro.component.scss'], 
  templateUrl: './pomodoro.component.html',
})

export class PomodoroComponent implements OnInit {

  @Input() task: Todo;
  started: boolean;
  minutes: number;
  seconds: number;
  fillerIncrement: number;
  fillerHeight: number;
  interval;
  total: number = 0;
  ion = ion;
  constructor() {
    this.resetVariables(25, 0, false);
    this.init();
    
  }
  ngOnInit() {
  
    ion.sound({
      sounds: [
          {
              name: "bell_ring",
          }
      ],
      volume: 1.5,
      path: "assets/sounds/",
      preload: true 
  });
  }
  resetVariables(mins, secs, started) {
    this.minutes = mins;
    this.seconds = secs;
    this.started = started;
    this.fillerIncrement = 200 / (this.minutes * 60);
    this.fillerHeight = 0;
  }
  startWork() {
    this.resetVariables(25, 0, true);
  };
  startShortBreak() {
    this.resetVariables(5, 0, true);
  };
  startLongBreak() {
    this.resetVariables(15, 0, true);
  };
  stopTimer() {
    this.resetVariables(25, 0, false);
  };
  timerComplete() {
    this.total++;
    this.started = false;
    ion.sound.play("bell_ring");
  }
  intervalCallback() {
    if (!this.started) return false;
    if (this.seconds == 0) {
      if (this.minutes == 0) {
        this.timerComplete();
        return;
      }
      this.seconds = 59;
      this.minutes--;
    } else {
      this.seconds--;
    }
    this.fillerHeight += this.fillerIncrement;
  };
  toDoubleDigit(num) {
    return num < 10 ? '0' + parseInt(num, 10) : num;
  };

  init() {
    let self = this;
    this.interval = setInterval(function () {
      self.intervalCallback();
    }, 1000);
  };
}