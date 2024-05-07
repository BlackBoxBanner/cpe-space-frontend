'use client';

import Link from 'next/link';
import { BiChevronDown } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { Button } from '@/components/common/button';
import { cn } from '@dookdiks/utils';
import { usePathname } from 'next/navigation';

export type CollapsibleTrigerCustom = {
  icon: () => React.ReactNode;
  custom: CollapsibleTrigerCustomProps;
  title?: undefined;
  active?: boolean;
};

export type CollapsibleTrigerCustomProps = ({}: {
  onClick: (active: boolean) => void;
  active: boolean;
}) => React.ReactNode;

export type CollapsibleTriger = {
  icon: () => React.ReactNode;
  title: string;
  active?: boolean;
  custom?: undefined;
};

export type CollapsibleContent = {
  icon: () => React.ReactNode | string;
  title: string;
  match: string;
};

export type CollapsibleProps = {
  triger: CollapsibleTriger | CollapsibleTrigerCustom;
  content: CollapsibleContent[];
};

const Collapsible = ({
  content,
  triger: {
    icon: TrigerIcon,
    custom: CustomTrigger,
    active = false,
    ...triger
  },
}: CollapsibleProps) => {
  const [trigger, setTrigger] = useState(active);

  const pathName = usePathname();

  useEffect(() => {
    setTrigger(active);
  }, [active, setTrigger]);
  return (
    <>
      <div className={cn('flex flex-col gap-0 relative')}>
        <div className="py-4 px-4">
          <div className="flex gap-5 items-center text-liberty fill-liberty group text-xl font-light">
            <div className="group-hover:text-[#9EAAC9] ease-in-out duration-300">
              <TrigerIcon />
            </div>
            {CustomTrigger ? (
              <CustomTrigger
                active={trigger}
                onClick={value => setTrigger(value)}
              />
            ) : (
              <Button
                buttonStyle={{
                  size: 'sm',
                  color: 'ghost',
                  position: 'start',
                  widthFull: true,
                }}
                className="border-none text-liberty fill-liberty flex justify-between items-center"
                onClick={() => setTrigger(value => !value)}
              >
                {triger.title}
                <BiChevronDown />
              </Button>
            )}
          </div>
        </div>
        <div
          className={cn(
            'flex flex-col max-h-48 h-48 gap-1 overflow-auto pl-4',
            trigger ? 'pt-2' : 'pt-0',
          )}
        >
          {trigger &&
            content.map(({ icon: ContentIcon, title, match }, index) => {
              return (
                <div className="flex gap-4" key={`${title}-${match}-${index}`}>
                  <div className="relative w-8">
                    <span className="absolute w-5 h-9 border-l border-b rounded-bl-xl -top-4 left-2 border-gray-white" />
                  </div>
                  <Link href={`${match}`} passHref legacyBehavior>
                    <Button
                      buttonStyle={{
                        color: 'ghost',
                        size: 'free',
                        position: 'start',
                        widthFull: true,
                        active: pathName.match(`${match}`)
                          ? 'orange'
                          : undefined,
                      }}
                      className="border-none p-1 px-3 rounded-xl text-xl font-light"
                    >
                      <div className="group flex items-center gap-4">
                        <ContentIcon />
                        <div>{title}</div>
                      </div>
                    </Button>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Collapsible;
