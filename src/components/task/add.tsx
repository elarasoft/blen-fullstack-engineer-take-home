'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { createTask } from '@/actions/taskActions';
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
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const FormSchema = z.object({
  title: z.string().min(1, {
    message: 'Title must be not empty.',
  }),
  description: z.string(),
  order: z.number(),
  dueDate: z.date({
    required_error: 'Due date is required.',
  }),
});

export function AddTask() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      description: '',
      order: 0,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await createTask({
      title: data.title,
      description: data.description,
      dueDate: format(data.dueDate, 'yyyy-MM-dd'),
      isCompleted: false,
    });

    if (result.success) {
      toast({
        title: 'Add new task successfully!',
      });
      router.back();
    }
  }

  return (
    <div className="mt-3 flex flex-col items-center justify-center">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Add New Task
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
          <FormField
            control={form.control}
            name="order"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Priority</FormLabel>
                <FormControl>
                  <Input
                    type="number"
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
          <div className="flex space-x-3">
            <Button className="w-full" type="button">
              <Link className="w-full" href="/">
                Back
              </Link>
            </Button>
            <Button type="submit" className="w-full">
              Add
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
