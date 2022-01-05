import { Component, OnInit } from '@angular/core';

import { TaskService } from '../../services/task.service';
import { Task } from '../../Task';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  public pbTasks: Task[] = this.tasks;
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasksFromDB().subscribe((tasks) => {
      this.taskService.setTasks(tasks);
      this.tasks = this.taskService.getTasks();
    });
  }

  deleteTask(index: number) {
    this.taskService.deleteTask(index).subscribe();
  }

  toggleReminder(i: number) {
    this.taskService.updateTaskReminder(i).subscribe();
  }

  addTask(task: Task) {
    this.taskService.addTaskToArr(task);
    this.taskService.addTaskToDb();
  }
}
