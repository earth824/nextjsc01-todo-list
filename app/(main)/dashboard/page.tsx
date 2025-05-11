import LatestTodo from '@/components/dashboard/latest-todo';
import { CardsSkeleton, LatestTodoSkeleton } from '@/components/dashboard/skeleton';
import StatusSummary from '@/components/dashboard/status-summary';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Dashboard'
};

export default function DashboardPage() {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Suspense fallback={<CardsSkeleton />}>
          <StatusSummary />
        </Suspense>
      </div>
      <Suspense fallback={<LatestTodoSkeleton />}>
        <LatestTodo />
      </Suspense>
    </>
  );
}
