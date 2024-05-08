'use client';

import { cn } from '@dookdiks/utils';
import { useState } from 'react';

export const TextArea = () => {
  const [data, setData] = useState<string>('');
  return (
    <div
      className={cn(
        'my-6 w-full',
        data.length <= 60 ? 'text-[3rem]' : 'text-lg',
      )}
    >
      <textarea
        name="content"
        placeholder="Write..."
        onChange={e => setData(e.target.value)}
        className="outline-none w-full resize-none"
        rows={2}
      />
    </div>
  );
};
