import Card from '@/components/dashboard/card';
import { countTodoStatus } from '@/libs/data';

export default async function StatusSummary() {
  const { completed, pending } = await countTodoStatus();
  return (
    <>
      <Card title="Completed" amount={completed} />
      <Card title="Pending" amount={pending} />
    </>
  );
}
