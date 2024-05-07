'use client';

import { usePathname } from 'next/navigation';

export function IsProfile({
  children,
  render,
}: Readonly<{ children: React.ReactNode; render: React.ReactNode }>) {
  const pathname = usePathname();

  return pathname.startsWith('/profile') ? render : children;
}
