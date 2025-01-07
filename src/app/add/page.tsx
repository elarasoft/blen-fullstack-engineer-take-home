import { AddTask } from '@/components/task';

export default function Home() {
  return (
    <main className="flex flex-col gap-10 p-10">
      <AddTask />
    </main>
  );
}
