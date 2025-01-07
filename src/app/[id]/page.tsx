'use server';

import { DetailTask } from '@/components/task';

export default async function Home({ params: { id } }: { params: { id: number } }) {
  return (
    <main className="flex flex-col gap-10 p-10">
      <DetailTask id={id} />
    </main>
  );
}
