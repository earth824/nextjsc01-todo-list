import LatestTodo from '@/components/dashboard/latest-todo';
import { CardsSkeleton, LatestTodoSkeleton } from '@/components/dashboard/skeleton';
import StatusSummary from '@/components/dashboard/status-summary';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Dashboard'
};

// #1
export const revalidate = 0;
// DashboardPage built at build time
// 0 < request < 60 DashboardPage at buit time
// 60 < request Dashboard rebuild Stale while revalidate (SWR)

// #2
// export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  // #3 unstable_noStore()

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
