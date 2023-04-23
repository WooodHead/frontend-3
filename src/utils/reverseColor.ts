export const reverseColor = (color: string) => {
  const oldColor = parseInt(`0x${color.replace(/#/g, '')}`, 16)
  return `#${(0xffffff - oldColor).toString(16)}`
}

export default reverseColor
