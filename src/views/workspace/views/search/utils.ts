const eventIdRE = /\[@(\d+?)\]/

export const splitAnswer = (answer: string): (string | number)[] => {
  answer = answer.replace(' ', '')
  const eventIds = answer.match(eventIdRE)
  if (!eventIds) {
    return [answer]
  }
  const splits = answer.split(eventIdRE)

  const result: (string | number)[] = []
  for (let i = 0; i < splits.length; i++) {
    const parsed = parseInt(splits[i])
    if (parsed) {
      result.push(parsed)
    } else {
      result.push(splits[i])
    }
  }
  return result
}
