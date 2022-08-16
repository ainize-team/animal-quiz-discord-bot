import { getKeyByValue } from './utils.js';
import quizEmojiDict from '../emojis.json' assert { type: 'json' };
const animalDict = quizEmojiDict['animalDict'];

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
