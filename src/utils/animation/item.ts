export const fadeInOut = (height: number) => ({
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: `${height}px` },
  exit: { opacity: 0, height: 0 },
})

export const fadeInOutX = (width: number) => ({
  initial: { opacity: 0, width: 0 },
  animate: { opacity: 1, width: `${width}px` },
  exit: { opacity: 0, width: 0 },
})
