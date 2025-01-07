'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function TaskAction({ id, type }: { id?: string; type: string }) {
  if (type === 'add')
    return (
      <div className="flex w-full">
        <Button className="mr-3">Refresh Tasks</Button>
        <Button className="ml-auto">
          <Link href="/add">Add</Link>
        </Button>
      </div>
    );
  else if (type === 'edit')
    return (
      <div className="m-3 flex w-[600px] items-center justify-center">
        <Button className="mr-3 w-full">
          <Link href={`/${id}/edit`} className="w-full">
            Edit
          </Link>
        </Button>
        <Button className="w-full">Delete</Button>
      </div>
    );
}
