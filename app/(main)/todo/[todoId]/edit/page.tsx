import EditForm from '@/components/todo/edit-form';
import EditHookForm from '@/components/todo/edit-hook-form';
import { fetchTodoById } from '@/libs/data';
import { notFound } from 'next/navigation';

type EditTodoPageProps = {
  params: Promise<{ todoId: string }>;
};

export default async function EditTodoPage({ params }: EditTodoPageProps) {
  const { todoId } = await params;
  const todo = await fetchTodoById(todoId);
  // if api use zod validate

  if (!todo) {
    notFound();
  }

  // return <EditForm {...todo} status={todo.status as 'completed' | 'pending'} />;
  return <EditHookForm {...todo} status={todo.status as 'completed' | 'pending'} />;
}

// /todo/:todoId
// params: Promise<{ id1:string, id2:string }>
