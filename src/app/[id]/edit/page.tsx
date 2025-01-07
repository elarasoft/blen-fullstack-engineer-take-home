import { EditTask } from '@/components/task';

export default function Home({ params: { id } }: { params: { id: string } }) {
  return (
    <main className="flex flex-col gap-10 p-10">
      <EditTask id={id} />
    </main>
  );
}
