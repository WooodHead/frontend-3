const eventIdRE = /\{"id":\d+\}/

export const splitAnswer = (answer: string): (string | number)[] => {
  answer = answer.replace(' ', '')
  const eventIds = answer.match(eventIdRE)
  if (!eventIds) {
    return [answer]
  }
  const splits = answer.split(eventIdRE)
  const result: (string | number)[] = []
  for (let i = 0; i < splits.length; i++) {
    if (splits[i]) {
      result.push(splits[i])
    }
    if (eventIds[i]) {
      result.push(JSON.parse(eventIds[i]).id)
    }
  }
  return result
}
