import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  editing: boolean = false;
  @Input() todo: Todo;
  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.editing = !this.editing;
  }
}

