import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Task } from '../Task';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class TaskService implements OnInit {
  private apiUrl =
    'https://takstracker-default-rtdb.europe-west1.firebasedatabase.app/tasks.json';
  tasksChange = new Subject<Task[]>();
  private tasks: Task[] = [];

  constructor(private http: HttpClient) {}

  getTasksFromDB() {
    return this.http.get<Task[]>(this.apiUrl);
  }

  ngOnInit() {
    this.tasksChange.next(this.tasks.slice());
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    return this.http.put(this.apiUrl, this.tasks);
  }

  updateTaskReminder(i: number) {
    this.tasks[i].reminder = !this.tasks[i].reminder;
    return this.http.put<Task>(this.apiUrl, this.tasks);
  }

  addTaskToDb() {
    let taskArr = this.tasks.slice();
    this.http.put(this.apiUrl, taskArr).subscribe();
    this.tasksChange.next(this.tasks.slice());
  }

  addTaskToArr(task: Task) {
    this.tasks.push(task);
  }

  setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.tasksChange.next(this.tasks.slice());
  }

  getTasks() {
    return this.tasks;
  }
}
