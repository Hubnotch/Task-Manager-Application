import { Component } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  tasks: Task[] = [];
  selectedPriority: 'all' | 'high' | 'medium' | 'low' = 'all';
  selectedStatus: 'all' | 'pending' | 'in progress' | 'completed' = 'all';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
  }

  filterTasks() {
    this.tasks = this.taskService.getTasks().filter(task =>
      (this.selectedPriority === 'all' || task.priority === this.selectedPriority) &&
      (this.selectedStatus === 'all' || task.status === this.selectedStatus)
    );
  }

  editTask(taskId: number) {
    // Implement logic to navigate to edit form component or open an edit modal
    console.log('Edit task: ', taskId); // Placeholder for edit functionality
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId);
    this.tasks = this.taskService.getTasks(); // Update task list after deletion
  }
}
