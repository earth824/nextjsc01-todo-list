'use client';

import { useDebouncedCallback } from 'use-debounce';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const oldUrlSearchParams = useSearchParams();

  const handleSearch = useDebouncedCallback((input: string) => {
    const nextUrlSearchParams = new URLSearchParams(oldUrlSearchParams);

    if (input.trim()) {
      nextUrlSearchParams.set('search', input);
    } else {
      nextUrlSearchParams.delete('search');
    }

    router.replace(`${pathname}?${nextUrlSearchParams.toString()}`);
  }, 500);

  return (
    <input
      onChange={e => handleSearch(e.target.value)}
      type="text"
      className="grow border border-gray-300 rounded-lg px-3 py-1.5 outline-none"
      placeholder="Search todo..."
      defaultValue={oldUrlSearchParams.get('search') || ''}
    />
  );
}
