import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { v4 } from "uuid";
import { UpdateTaskDto } from "./dto/task.dto";

@Injectable()
export class TasksService {

  // simulate a database
  private tasks: Task[] = [{
    id: "1",
    title: "first tasks",
    description: "some tarsk",
    status: TaskStatus.PENDING
  }];

  getAllTasks() {
    return this.tasks;
  }

  createTasks(title: string, description: string) {
    const task = {
      id: v4(),
      title,
      description,
      status: TaskStatus.PENDING
    }
    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string) {
    return this.tasks.find(task => task.id === id);
  }

  updateTasks(id: string, updatedFields: UpdateTaskDto): Task {
    const task = this.getTaskById(id);
    const newTask = Object.assign(task, updatedFields);
    this.tasks = this.tasks.map(task => task.id == id ? newTask : task);
    return newTask;
  }

  deleteTasks(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

}
