export const fadeInOut = (height: number) => ({
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: `${height}px` },
  exit: { opacity: 0, height: 0 },
})
