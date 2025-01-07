'use client';

import { deleteTask } from '@/actions/taskActions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function TaskAction({ id, type }: { id?: number; type: string }) {
  const router = useRouter();

  if (type === 'add')
    return (
      <div className="flex w-full">
        <Button
          className="mr-3"
          onClick={() => {
            window.location.href = '/';
          }}>
          Refresh
        </Button>
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
        <Button
          className="w-full"
          variant="destructive"
          onClick={() => {
            deleteTask(id || 0);
            router.push('/');
          }}>
          Delete
        </Button>
      </div>
    );
}
