export const popUpAnimation = (tl: gsap.core.Timeline, className: string) => {
  return tl.fromTo(
    className,
    {
      y: "100%",
      opacity: 0,
    },
    {
      y: "0%",
      opacity: 1,
      duration: 0.48,
      ease: "power4",
      stagger: 0.1,
    }
  );
};
