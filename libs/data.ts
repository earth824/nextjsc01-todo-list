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
      if (isCountStatusKey(el.status)) {
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

function isCountStatusKey(value: unknown): value is keyof CountStatus {
  return value === 'completed' || value === 'pending';
}

export async function fetchTodo(search: string) {
  if (search) {
    // SELECT * FROM todo WHERE title LIKE %search%
    return prisma.todo.findMany({
      where: { title: { contains: search, mode: 'insensitive' } },
      orderBy: { createdAt: 'desc' }
    });
  }
  return prisma.todo.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function fetchTodoById(id: string) {
  return prisma.todo.findUnique({ where: { id } });
}
