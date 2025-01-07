import { TaskAction, TaskList } from '@/components/task';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center gap-10 p-10">
      <div className="w-[800px] space-y-3">
        <TaskAction type="add" />
        <TaskList />
      </div>
    </main>
  );
}
