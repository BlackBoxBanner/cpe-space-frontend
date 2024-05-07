'use client';

import { cn } from '@dookdiks/utils';
import Collapsible, {
  CollapsibleProps,
  CollapsibleTrigerCustomProps,
} from './collapsible';
import {
  BiChevronDown,
  BiHive,
  BiHome,
  BiLockAlt,
  BiRocket,
} from 'react-icons/bi';
import { z } from 'zod';
import { CommunitiesSchema, TopicSchema } from '@/types/zodSchema';
import {
  AiOutlineCrown,
  AiOutlinePlus,
  AiOutlinePushpin,
} from 'react-icons/ai';
import { Button, Link } from '@/components/common/button';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export const CustomCommunitiesButton: CollapsibleTrigerCustomProps = ({
  onClick,
  active,
}) => {
  const [showCreate, setShowCreate] = useState(false);

  const showTrigger = () => {
    setShowCreate(e => !e);
  };
  return (
    <>
      <div
        className={cn(
          'absolute w-full h-full top-0 left-0 z-50 flex justify-center items-center',
          showCreate ? 'flex' : 'hidden',
        )}
      >
        <Link
          href="/community/create"
          onClick={_ => showTrigger()}
          buttonStyle={{
            size: 'sm',
          }}
          className={cn(
            'text-xl flex justify-center items-center gap-2 w-fit z-50',
          )}
        >
          <AiOutlinePlus />
          <p>Create community</p>
        </Link>
        <div
          onClick={_ => showTrigger()}
          className="absolute w-full h-full top-0 left-0 bg-smoky-black/85 rounded-lg"
        />
      </div>
      <div className="group text-liberty hover:text-[#9EAAC9] flex justify-between items-center w-full">
        <button onClick={_ => showTrigger()}>Communities</button>
        <button onClick={() => onClick(!active)}>
          <BiChevronDown
            className={cn(
              !active ? 'rotate-180' : 'rotate-0',
              'ease-in-out duration-300',
            )}
          />
        </button>
      </div>
    </>
  );
};

export const CustomTopicsButton: CollapsibleTrigerCustomProps = ({
  onClick,
  active,
}) => {
  const [showCreate, setShowCreate] = useState(false);

  const showTrigger = () => {
    setShowCreate(e => !e);
  };
  return (
    <>
      <div
        className={cn(
          'absolute w-full h-full top-0 left-0 z-50 flex justify-center items-center',
          showCreate ? 'flex' : 'hidden',
        )}
      >
        <Link
          href="/topic/create"
          onClick={_ => showTrigger()}
          buttonStyle={{
            size: 'sm',
          }}
          className={cn(
            'text-xl flex justify-center items-center gap-2 w-fit z-50',
          )}
        >
          <AiOutlinePlus />
          <p>Create topics</p>
        </Link>
        <div
          onClick={_ => showTrigger()}
          className="absolute w-full h-full top-0 left-0 bg-smoky-black/85 rounded-lg"
        />
      </div>
      <div className="group text-liberty hover:text-[#9EAAC9] flex justify-between items-center w-full">
        <button onClick={_ => showTrigger()}>Topics</button>
        <button onClick={() => onClick(!active)}>
          <BiChevronDown
            className={cn(
              !active ? 'rotate-180' : 'rotate-0',
              'ease-in-out duration-300',
            )}
          />
        </button>
      </div>
    </>
  );
};

type CommunitiesType = z.infer<typeof CommunitiesSchema>;

export const CommunitiesCollapsibleButton = ({
  communities,
  userId,
}: {
  userId: string;
  communities: CommunitiesType[] | undefined;
}) => {
  const data: CollapsibleProps = {
    triger: {
      icon: () => <BiHive />,
      active: true,
      custom: CustomCommunitiesButton,
    },
    content: !communities
      ? []
      : communities.map(community => ({
          icon: () =>
            userId === community.userId ? (
              <AiOutlineCrown />
            ) : community.status == 'PRIVATE' ? (
              <BiLockAlt />
            ) : (
              ''
            ),
          title: community.name,
          match: `community/${community.id}`,
        })),
  };

  return <Collapsible {...data} />;
};

type TopicType = z.infer<typeof TopicSchema>;

export const TopicCollapsibleButton = ({
  topics,
}: {
  topics: TopicType[] | undefined;
}) => {
  const data: CollapsibleProps = {
    triger: {
      icon: () => <AiOutlinePushpin />,
      active: true,
      custom: CustomTopicsButton,
    },
    content: !topics
      ? []
      : topics.map(topic => ({
          icon: () => <></>,
          title: topic.name,
          match: `topic/${topic.id}`,
        })),
  };

  return <Collapsible {...data} />;
};

export const SideBarMainSection = () => {
  const path = usePathname();
  return (
    <>
      <div className="flex flex-col gap-2">
        <Link href={'/'} passHref legacyBehavior>
          <Button
            buttonStyle={{
              color: 'ghost',
              position: 'start',
              active: path == '/' ? 'orange' : undefined,
            }}
            className="text-xl border-none flex gap-6 items-center px-4"
          >
            <BiHome />
            <p>Home</p>
          </Button>
        </Link>
        <Link href={'/trending'} passHref legacyBehavior>
          <Button
            buttonStyle={{
              color: 'ghost',
              position: 'start',
              active: path == '/trending' ? 'orange' : undefined,
            }}
            className="text-xl border-none flex gap-6 items-center px-4"
          >
            <BiRocket />
            <p>Trending</p>
          </Button>
        </Link>
      </div>
    </>
  );
};
