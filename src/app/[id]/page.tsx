import { DetailTask } from '@/components/task';

export default function Home({ params: { id } }: { params: { id: string } }) {
  return (
    <main className="flex flex-col gap-10 p-10">
      <DetailTask id={id} />
    </main>
  );
}
