'use server';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Task } from '@/constants/types';
import { faker } from '@/lib/faker';
import Link from 'next/link';

const testData: Task[] = [
  {
    id: 1,
    title: faker.generateWords(3),
    description: faker.generateParagraphs(3),
    due_date: '2025-01-15',
    isCompleted: false,
  },
  {
    id: 2,
    title: faker.generateWords(3),
    description: faker.generateParagraphs(3),
    due_date: '2025-01-15',
    isCompleted: false,
  },
  {
    id: 3,
    title: faker.generateWords(3),
    description: faker.generateParagraphs(3),
    due_date: '2025-01-15',
    isCompleted: false,
  },
  {
    id: 4,
    title: faker.generateWords(3),
    description: faker.generateParagraphs(3),
    due_date: '2025-01-15',
    isCompleted: false,
  },
  {
    id: 5,
    title: faker.generateWords(3),
    description: faker.generateParagraphs(3),
    due_date: '2025-01-15',
    isCompleted: false,
  },
];

export async function TaskList() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Table>
        <TableCaption>A list of your tasks.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="w-[150px]">Due Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {testData.map((item: Task) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>
                <Link href={`/${item.id}`}>{item.title}</Link>
              </TableCell>
              <TableCell>{item.due_date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
