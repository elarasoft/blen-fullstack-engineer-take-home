'use client';

import { fetchTaskById } from '@/actions/taskActions';
import { Button } from '@/components/ui/button';
import { Task } from '@/constants/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TaskAction } from './action';

export function DetailTask({ id }: { id: number }) {
  const getTask = (id: number) => {
    return new Promise(async (resolve, reject) => {
      const { task: fetchTask } = await fetchTaskById(id);
      if (fetchTask === undefined) {
        reject(false);
      } else {
        resolve(fetchTask);
      }
    });
  };
  const [task, setTask] = useState<Task>();
  const router = useRouter();

  useEffect(() => {
    getTask(id).then((task) => {
      setTask(task as Task);
    });
  }, []);

  return (
    <div className="mt-3 flex flex-col items-center justify-center">
      <h2 className="mt-10 w-[600px] scroll-m-20 border-b pb-2 text-center text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {task?.title}
      </h2>

      <p className="w-[600px] leading-7 [&:not(:first-child)]:mt-6">{task?.description}</p>

      <p className="w-[600px] leading-7 [&:not(:first-child)]:mt-6">{task?.dueDate}</p>

      <TaskAction id={task?.id} type="edit" />

      <div className="flex w-[600px] space-x-3">
        <Button className="w-full">
          <div className="w-full" onClick={() => router.back()}>
            Back
          </div>
        </Button>
      </div>
    </div>
  );
}
