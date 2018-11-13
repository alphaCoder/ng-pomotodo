import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Title } from "@angular/platform-browser";

@Injectable({providedIn: 'root'})
export class PomodoroTimerService {
  time = new BehaviorSubject('');

  constructor(private titleService: Title) {}

  setTime(time: string) {
    this.time.next(time);
    this.titleService.setTitle(time);
   }
}