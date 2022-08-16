import quizEmojiDict from '../emojis.json' assert { type: 'json' };
const animalDict = quizEmojiDict['animalDict'];

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

function getQuizDict(text, animal) {
  const description = text;
  const quiz = description.toLowerCase().replaceAll(animal, 'X');
  const emoji = getKeyByValue(animalDict, animal);
  const quizDict = {
    description: description,
    quiz: quiz,
    animal: animal,
    emoji: emoji,
  };
  return quizDict;
}

export { getQuizDict };
