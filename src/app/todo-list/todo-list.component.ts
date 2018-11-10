import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todosByCategory: {[key:string]: Todo[]} = {};
  selectedCategory: string = 'Today';
  categoryName = '';
  selectedTodo: Todo = null;
  visible = false;
  constructor() { }

  ngOnInit() {

    // todo: add api call
      this.todosByCategory['Today'] = [];
  }

  addCategory() {
    const categoryName = this.categoryName.trim();
    if (categoryName.length > 0) {
      if (!this.todosByCategory[categoryName]) {
        this.todosByCategory[categoryName] = [];
        this.selectedCategory = categoryName; 
        this.categoryName = '';
      }
    }
  }

  removeCategory(categoryName: string) {
    delete this.todosByCategory[categoryName];
    if (this.selectedCategory === categoryName) {
      this.selectedCategory = null;
      const keys = Object.keys(this.todosByCategory);
      if (keys && keys.length > 0) {
        this.selectedCategory = keys[keys.length-1];
      }
    }
  }

  get categories(): string[] { return Object.keys(this.todosByCategory); }

  add() {
    let todo = new Todo();
    todo.ordinal = this.todosByCategory[this.selectedCategory].length;
    todo.focus = true;
    this.todosByCategory[this.selectedCategory].push(todo);
  }

  handleEnter(todo: Todo) {
    if (todo.ordinal === this.todosByCategory[this.selectedCategory].length - 1) {
      this.add();
    }
  }

  handleSelectedTask(todo: Todo) {
    this.selectedTodo = todo;
  }

  setSelectedCategory(categoryName) {
    this.selectedCategory = categoryName;
  }

  handleOnDeleteTodo(todo: Todo) {
    let index = this.todosByCategory[this.selectedCategory].indexOf(todo);
    this.todosByCategory[this.selectedCategory].splice(index, 1);
  }
}
