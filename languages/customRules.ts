export function customRuRule(choice: number) {
  if (choice === 0) {
    return 0
  }

  const endsWithOne = choice % 10 === 1 && choice !== 11 && choice < 2000
  const endsWithFew =
    (choice % 10 === 2 || choice % 10 === 3 || choice % 10 === 4) &&
    (choice < 10 || choice > 20) &&
    choice < 2000

  return endsWithOne ? 1 : endsWithFew ? 2 : 3
}

export function customEnRule(choice: number) {
  if (choice === 0) {
    return 2
  }

  return choice === 1 ? 0 : 1
}

export function customUzKrRule(choice: number) {
  return choice === 0 ? 1 : 0
}
