import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pomodoro-app',
  styleUrls: ['./pomodoro.component.scss'], 
  templateUrl: './pomodoro.component.html',
})

export class PomodoroComponent {

  @Input() task: string = '';
  started: boolean;
  minutes: number;
  seconds: number;
  fillerIncrement: number;
  fillerHeight: number;
  interval;

  constructor() {
    this.resetVariables(25, 0, false);
    this.init();
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
    this.started = false;
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