'use server';

import { db } from '@/db/client'; // Import your database client
import { tasks as TaskSchema } from '@/db/schema/task'; // Import your tasks schema
import { desc, eq } from 'drizzle-orm';

type Task = {
  id?: number;
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
  order?: number;
};

// Define the server action for creating a task
export async function createTask(data: Task) {
  try {
    // Validate the data against the schema
    const value: Task = data;

    // Insert the task into the database
    await db.insert(TaskSchema).values(value);

    // Return a success message or the created task
    return { success: true, message: 'Create Task successfully' };
  } catch (error) {
    return {
      success: false,
      message: error,
    };
  }
}

export async function updateTask(data: Task) {
  try {
    // Validate the data against the schema
    const value: Task = data;

    // Insert the task into the database
    await db
      .update(TaskSchema)
      .set(value)
      .where(eq(TaskSchema.id, data.id || 0));

    // Return a success message or the created task
    return { success: true, message: 'Update Task successfully' };
  } catch (error) {
    return { success: false, message: error };
  }
}

export async function fetchAllTasks() {
  try {
    // Fetch all tasks from the database
    const tasks = await db.select().from(TaskSchema).orderBy(desc(TaskSchema.order));
    return { tasks };
  } catch (error) {
    return { tasks: [] };
  }
}

export async function fetchTaskById(id: number) {
  try {
    // Fetch a task from the database
    const task = await db.select().from(TaskSchema).where(eq(TaskSchema.id, id));
    if (task.length > 0) return { task: task[0] };
    else return { task: undefined };
  } catch (error) {
    return { task: undefined };
  }
}

export async function deleteTask(id: number) {
  try {
    // Delete a task from the database
    await db.delete(TaskSchema).where(eq(TaskSchema.id, id));
    return { success: true };
  } catch (error) {
    return { success: false, message: error };
  }
}
