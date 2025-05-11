import prisma from '@/libs/prisma';

export async function fetchLatestTodo() {
  return prisma.todo.findMany({ orderBy: { createdAt: 'desc' }, take: 5 });
}

export async function countTodoStatus() {
  // SELECT status, COUNT(status) FROM todo GROUP BY status
  const result = await prisma.todo.groupBy({
    by: 'status',
    _count: { status: true }
  });
  return result.reduce(
    (acc, el) => {
      if (isCountStatus(el.status)) {
        acc[el.status] = el._count.status;
      }
      return acc;
    },
    { completed: 0, pending: 0 }
  );
}

type CountStatus = {
  completed: number;
  pending: number;
};

function isCountStatus(value: unknown): value is keyof CountStatus {
  return value === 'completed' || value === 'pending';
}

export async function fetchTodo() {
  return prisma.todo.findMany({ orderBy: { createdAt: 'desc' } });
}
