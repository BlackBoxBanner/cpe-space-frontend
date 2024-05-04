export type SearchCategory = 'accounts' | 'community' | 'topic';

export const isCategory = (value?: string | null): SearchCategory => {
  switch (value) {
    case 'accounts':
      return 'accounts';
    case 'community':
      return 'community';
    case 'topic':
      return 'topic';
    default:
      return 'accounts';
  }
};
