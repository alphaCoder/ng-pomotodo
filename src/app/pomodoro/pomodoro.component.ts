import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../models/todo';
import 'ion-sound';
import { PomodoroTimerService } from '../providers/pomodoro-time.service';
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
  isBreak = false;
  constructor(public pomodoroTimerService: PomodoroTimerService) {
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
    this.pomodoroTimerService.setTime(`${this.toDoubleDigit(this.minutes)} : ${this.toDoubleDigit(this.seconds)}`);
  }

  startWork() {
    this.resetVariables(25, 0, true);
  };

  startShortBreak() {
    this.isBreak = true;
    this.resetVariables(5, 0, true);
  };

  startLongBreak() {
    this.resetVariables(15, 0, true);
  };

  stopTimer() {
    this.isBreak = false;
    this.resetVariables(25, 0, false);
  };

  timerComplete() {
    
    this.started = false;
    ion.sound.play("bell_ring");
    if (!this.isBreak) {
    this.total++;  
    let options = {
      body: `${this.total} pomodoros completed!`
    };
     new Notification('Pomodoro Complete', options);
   }
   else {
     new Notification('Break completed, time for action');
   }
   this.isBreak = false;
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

    this.pomodoroTimerService.setTime(`${this.toDoubleDigit(this.minutes)} : ${this.toDoubleDigit(this.seconds)}`);
  };
  toDoubleDigit(num) {
    return num < 10 ? '0' + parseInt(num, 10) : num;
  };

  reset() {
    this.stopTimer();
    this.total = 0;
  }

  init() {
    let self = this;
    this.interval = setInterval(function () {
      self.intervalCallback();
    }, 1000);
  };
}