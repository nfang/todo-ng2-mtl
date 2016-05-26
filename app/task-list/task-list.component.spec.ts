import {
  it,
  inject,
  injectAsync,
  describe,
  beforeEach,
  beforeEachProviders
} from '@angular/core/testing';
import { Component, provide } from '@angular/core';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { By } from '@angular/platform-browser';

import { Task } from '../shared/task.model';
import { TaskListComponent } from '../task-list/task-list.component';
import {
  TaskService,
  InMemoryTaskService,
  InMemoryTaskProvider
} from '../shared/services';

class MockInMemoryTaskProvider {
  public tasks: Task[] = [
    new Task('Task 1', 'Note 1'),
    new Task('Task 2', 'Note 2'),
    new Task('Task 3', 'Note 3')
  ];
}

describe('TaskListComponent', () => {
  let builder, taskService;

  beforeEachProviders(() => [
    provide(InMemoryTaskProvider, { useClass: MockInMemoryTaskProvider }),
    provide(TaskService, { useClass: InMemoryTaskService }),
    InMemoryTaskService,
    TaskListComponent,
    TestComponentBuilder
  ]);

  beforeEach(inject([TestComponentBuilder, InMemoryTaskService], (tcb, service) => {
    builder = tcb;
    taskService = service;
  }));

  it('should inject the component', inject([TaskListComponent],
    (component: TaskListComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(TaskListComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(TaskListComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));

  it('should return a list of tasks', inject([ TaskListComponent ], (component) => {
    let tasks = component.tasks;
    expect(tasks.length).toBe(3);
  }));

  it('should return a filtered list of tasks according to query', inject([ TaskListComponent ],
    (component) => {
      component.updateQuery({ value: new Task('3') });
      let tasks = component.tasks;
      expect(tasks.length).toBe(1);
      expect(tasks[0].title).toEqual('Task 3');
  }));

  it('should return a ordered list of tasks according to order', inject([ TaskListComponent ],
    (component) => {
      let beforeOrderTasks = component.tasks;
      beforeOrderTasks[1].isPrioritised = true;
      let afterOrderTasks = component.tasks;
      expect(afterOrderTasks[0].title).toEqual('Task 2');
    }));
});

@Component({
  selector: 'test',
  template: `<task-list></task-list>`,
  directives: [TaskListComponent]
})
class TaskListComponentTestController { }
