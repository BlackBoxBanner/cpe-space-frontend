export const fileExtension = (originalName: string | undefined) => {
  const match = originalName?.match(/\.([^.]+)$/);
  if (match) {
    return match[1];
  } else {
    return '';
  }
};
