import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  @Input() editMode = false;
  @Input() taskToEdit?: Task;

  taskForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: [''],
      priority: ['low', Validators.required],
      status: [{ value: 'pending', disabled: this.editMode }], // Disabled in edit mode
    });

    if (this.editMode && this.taskToEdit) {
      this.taskForm.patchValue(this.taskToEdit); // Set form values for edit mode
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const task = this.taskForm.value as Task;
      if (this.editMode) {
        this.taskService.editTask(task.id, task);
      } else {
        // Generate unique ID before saving new task
        task.id = this.generateUniqueId();
        this.taskService.addTask(task);
      }
      this.taskForm.reset(); // Reset form after successful submission
    }
  }

  private generateUniqueId(): number {
    // Implement logic to generate a unique ID for new tasks
    return Math.floor(Math.random() * 100000); // Placeholder for unique ID generation
  }
}
