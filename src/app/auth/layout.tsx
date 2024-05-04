import { cn } from '@dookdiks/utils';
import Image from 'next/image';
import top from '@/assets/welcome/top.png';
import bottom from '@/assets/welcome/bottom.png';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main
        className={cn(
          'bg-alabaster h-screen max-h-screen p-4 md:p-8 grid grid-rows-[auto,1fr,auto] lg:grid-rows-3',
        )}
      >
        <section className="md:-translate-y-6 items-start flex justify-start">
          <Image src={top} width={7372} height={1392} alt="" />
        </section>
        <section
          className={cn(
            'px-0 my-auto lg:py-0 sm:px-14 grid grid-cols-1 grid-rows-2 lg:grid-rows-1 lg:grid-cols-[auto,1fr] lg:gap-24 z-50',
          )}
        >
          {children}
        </section>
        <section className="md:translate-y-2 items-end flex justify-end">
          <Image src={bottom} width={7372} height={1392} alt="" />
        </section>
      </main>
    </>
  );
}
