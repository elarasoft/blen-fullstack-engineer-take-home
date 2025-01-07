import { Button } from '@/components/ui/button';

export default function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <Button>Click me</Button>
      </div>
      <h1 className="text-2xl font-bold"> Welcome to Full Stack Engineer Assessment</h1>
      <p className="text-sm text-gray-500">
        Follow the instructions in the{' '}
        <span className="font-bold text-muted-foreground">README.md</span> file
      </p>
    </div>
  );
}
