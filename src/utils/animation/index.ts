export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
}

export const fadeOut = {
  exit: { opacity: 0 },
}

export const fadeInOut = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const fadeInOutY = {
  initial: { translateY: '100%', opacity: 0 },
  animate: { translateY: '0px', opacity: 1 },
  exit: { translateY: '100%', opacity: 0 },
}
