import { Component } from 'angular2/core';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';
import { TaskListComponent } from './task-list.component';

@Component({
  selector: 'task-finder',
  templateUrl: 'components/task-finder.component.html',
  directives: [ TaskListComponent ],
  providers: [ TaskService ]
})
export class TaskFinderComponent {
  task: Task;

  constructor(private _taskService: TaskService) {
    this.task = new Task('');
  }

  addTask() {
    if (!this.task.title) {
      return;
    }
    this.task.dueDate = new Date();
    this._taskService.addTask(this.task);
    this.task = new Task('');
  }
}
