'use client';

import { createContext, useContext, useState } from 'react';

type CreatePostContextType = {
  selectedCommunities: string[];
  setSelectedCommunities: (communities: string[]) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  content: string;
  setContent: (content: string) => void;
};

const CreatePostContext = createContext<CreatePostContextType>({
  selectedCommunities: [],
  setSelectedCommunities: () => {},
  selectedTags: [],
  setSelectedTags: () => {},
  content: '',
  setContent: () => {},
});

export const useCreatePostContext = () => useContext(CreatePostContext);

export const CreatePostProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedCommunities, setSelectedCommunities] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [content, setContent] = useState<string>('');

  return (
    <CreatePostContext.Provider
      value={{
        selectedCommunities,
        setSelectedCommunities,
        selectedTags,
        setSelectedTags,
        content,
        setContent,
      }}
    >
      {children}
    </CreatePostContext.Provider>
  );
};
