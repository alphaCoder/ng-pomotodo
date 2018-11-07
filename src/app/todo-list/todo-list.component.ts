import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos: Todo[] = [];
  selectedTodo: Todo = null;
  constructor() { }

  ngOnInit() {
  }

  add() {
    let todo = new Todo();
    todo.ordinal = this.todos.length;
    todo.focus = true;
    this.todos.push(todo);
  }

  handleEnter(todo: Todo) {
    if (todo.ordinal === this.todos.length - 1) {
      this.add();
    }
  }

  handleSelectedTask(todo: Todo) {
    this.selectedTodo = todo;
  }
}
