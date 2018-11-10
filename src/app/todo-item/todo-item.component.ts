import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  editing: boolean = false;
  @Input() isSelectedTask: boolean = false;
  @Input() todo: Todo;
  @Output() onEnter: EventEmitter<Todo> = new EventEmitter();
  @Output() onSelectedTask: EventEmitter<Todo> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.editing = !this.editing;
  }

  handleKeyUp(e: Event) {
    event.preventDefault();
    this.onEnter.emit(this.todo);
  }
  bindToPomodoro() {
    if (!this.isSelectedTask) {
      this.onSelectedTask.emit(this.todo);
    }
  }
}

