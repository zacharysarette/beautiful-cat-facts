export function getRandomNumber (min, max) {
  return Math.floor((Math.random() * max) + min)
}

export function getRandomCardMark () {
  return getRandomNumber(0, 3)
}

export function getRandomCardNumber () {
  return getRandomNumber(1, 10)
}

export function coinFlip () {
  return Math.random() > 0.5
}
