'use client';

import { cn } from '@dookdiks/utils';
import { useState } from 'react';
import { useCreatePostContext } from './context';

export const TextArea = () => {
  const { content, setContent } = useCreatePostContext();
  return (
    <div
      className={cn(
        'my-6 w-full',
        content.length <= 60 ? 'text-[3rem]' : 'text-lg',
      )}
    >
      <textarea
        name="content"
        placeholder="Write..."
        onChange={e => setContent(e.target.value)}
        className="outline-none w-full resize-none"
        rows={2}
      />
    </div>
  );
};
