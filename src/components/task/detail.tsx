'use server';

import { Button } from '@/components/ui/button';
import { faker } from '@/lib/faker';
import { TaskAction } from './action';

export async function DetailTask({ id }: { id: string }) {
  return (
    <div className="mt-3 flex flex-col items-center justify-center">
      <h2 className="mt-10 w-[600px] scroll-m-20 border-b pb-2 text-center text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {faker.generateWords(3)}
      </h2>

      <p className="w-[600px] leading-7 [&:not(:first-child)]:mt-6">
        {faker.generateParagraphs(3)}
      </p>

      <p className="w-[600px] leading-7 [&:not(:first-child)]:mt-6">{faker.generateWords(1)}</p>

      <TaskAction id={id} type="edit" />

      <div className="flex w-[600px] space-x-3">
        <Button className="w-full">Back</Button>
      </div>
    </div>
  );
}
