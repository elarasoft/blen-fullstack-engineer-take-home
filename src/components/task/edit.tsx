'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { fetchTaskById, updateTask } from '@/actions/taskActions';
import { useToast } from '@/components/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { Task } from '@/constants/types';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const FormSchema = z.object({
  title: z.string().min(1, {
    message: 'Title must be not empty.',
  }),
  description: z.string(),
  dueDate: z.date({
    required_error: 'Due date is required.',
  }),
});

export function EditTask({ id }: { id: number }) {
  const { toast } = useToast();
  const router = useRouter();

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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      description: '',
      dueDate: new Date(),
    },
  });

  useEffect(() => {
    getTask(id).then((res) => {
      const data = res as Task;
      setTask(data);
      form.setValue('title', data.title);
      form.setValue('description', data.description);
      form.setValue('dueDate', new Date(data.dueDate));
    });
  }, []);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await updateTask({
      id: id,
      title: data.title,
      description: data.description,
      dueDate: format(data.dueDate, 'yyyy-MM-dd'),
      isCompleted: false,
    });

    if (result.success) {
      toast({
        title: 'Update Task successfully!',
      });
      router.push(`/${id}`);
    }
  }

  return (
    <div className="mt-3 flex flex-col items-center justify-center">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Edit Task
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-[600px] space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    className={cn(
                      'pl-3 text-left font-normal',
                      !field.value && 'text-muted-foreground'
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Due Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}>
                        {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex space-x-3">
            <Button className="w-full" type="button">
              <div className="w-full" onClick={() => router.back()}>
                Back
              </div>
            </Button>
            <Button type="submit" className="w-full">
              Update
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
