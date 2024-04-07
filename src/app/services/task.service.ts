import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }
  tasks: Task[] = this.loadTasksFromStorage();

  addTask(task: Task) {
    this.tasks.push(task);
    this.saveTasksToStorage();
  }

  editTask(taskId: number, updatedTask: Task) {
    const taskIndex = this.tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
      this.tasks[taskIndex] = updatedTask;
      this.saveTasksToStorage();
    }
  }

  deleteTask(taskId: number) {
    const taskIndex = this.tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1);
      this.saveTasksToStorage();
    }
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  private loadTasksFromStorage(): Task[] {
    const tasksJson = localStorage.getItem('tasks');
    if (!tasksJson) {
      return [];
    }
    return JSON.parse(tasksJson) as Task[];
  }

  private saveTasksToStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

}
